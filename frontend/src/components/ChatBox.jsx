import { useEffect, useState, useRef } from "react";
import { Box, Paper, Typography, Stack } from "@mui/material";
import { fetchGroupMessages, sendGroupMessage } from "../services/apiService";
import { WebSocketService } from "../services/websocketService";
import ChatInput from "./ChatInput";

const ChatBox = ({ groupId, chatId, currentUserId, canChat, participants = [] }) => {
  const [messages, setMessages] = useState([]);
  const [typingUserIds, setTypingUserIds] = useState([]);
  const typingTimeoutsRef = useRef({});
  const messagesEndRef = useRef(null);

  const loadMessages = async () => {
    try {
      const msgs = await fetchGroupMessages(chatId);
      setMessages(msgs);
    } catch (err) {
      console.error("Error loading chat messages:", err.message);
    }
  };

  useEffect(() => {
    loadMessages();
  }, [chatId]);

  useEffect(() => {
    if (!canChat) return;
  
    const token = localStorage.getItem("token");
  
    WebSocketService.disconnect();
    WebSocketService.connect(token, {
      chatId,
      onMessage: (data) => {
        try {
          const raw = JSON.parse(data);
          const isCorrectChat = Number(raw.chatId) === Number(chatId);
  
          if (!isCorrectChat) return;
  
          if (raw.type === "typing") {
            const userId = Number(raw.userId);
            setTypingUserIds((prev) => {
              if (!prev.includes(userId)) {
                return [...prev, userId];
              }
              return prev;
            });
          
            clearTimeout(typingTimeoutsRef.current[userId]);
            typingTimeoutsRef.current[userId] = setTimeout(() => {
              setTypingUserIds((prev) => prev.filter(id => id !== userId));
            }, 5000);
            return;
          }
  
          if (raw.type === "message") {
            const msg = {
              messageId: raw.messageId,
              senderId: raw.senderId,
              senderName: raw.senderName,
              content: raw.content,
              timeStamp: raw.timeStamp,
              chatId: raw.chatId
            };
  
            setMessages(prev => {
              const exists = prev.some(m => m.messageId === msg.messageId);
              if (exists) return prev;
              return [...prev, msg];
            });
          }
        } catch (err) {
          console.warn("Invalid WebSocket message format:", data);
        }
      }
    });
  
    return () => WebSocketService.disconnect();
  }, [chatId, canChat]);

  const handleSend = async (message) => {
    if (!message.trim()) return;

    try {
      await sendGroupMessage(groupId, { content: message });
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  const typingUsernames = typingUserIds
  .filter(id => id !== Number(currentUserId))
  .map(id => participants.find(p => Number(p.userId) === id)?.username)
  .filter(Boolean);
    

  return (
    <Box sx={{ height: "55vh", display: "flex", flexDirection: "column" }}>
      <Paper
        sx={{
          flex: 1,
          p: 0.5,
          backgroundColor: "rgba(255,255,255,0.05)",
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
          <Stack spacing={2}>
            {messages.map((msg) => {
              if (!msg || !msg.content || !msg.senderName) return null;

              const isOwn = Number(msg.senderId) === Number(currentUserId);

              return (
                <Box
                  key={msg.messageId}
                  sx={{
                    display: "flex",
                    justifyContent: isOwn ? "flex-end" : "flex-start",
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: "60%",
                      bgcolor: isOwn ? "primary.main" : "grey.300",
                      color: isOwn ? "white" : "black",
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                    }}
                  >
                    <Typography variant="body2" fontWeight={500}>
                      {isOwn ? "You" : msg.senderName}
                    </Typography>
                    <Typography variant="body1">{msg.content}</Typography>
                  </Box>
                  <div ref={messagesEndRef} />
                </Box>
              );
            })}
          </Stack>
        </Box>
      </Paper>

      <Box sx={{ display: "flex",flexDirection: "column", alignItems: "center", pt: 0.5 }}>
      {canChat ? (
        <>
          {typingUsernames.length > 0 && (
            <Typography variant="caption" sx={{ color:"#000dff",fontSize: "11px",fontWeight: "600", px: 0.5, pt: 0.5, width: "100%" }}>
              {typingUsernames.join(", ")} {typingUsernames.length === 1 ? "is" : "are"} typing...
            </Typography>
          )}
          <ChatInput
            onSend={handleSend}
            onTyping={(chatId) => {
              if (WebSocketService.isConnected()) {
                WebSocketService.send({ type: "typing", chatId });
              } else {
                console.warn("WebSocket is not ready");
              }
            }}
            chatId={chatId}
          />
        </>
      ) : (
        <Typography variant="body2" color="text.secondary">
          You must be an accepted member to participate in the chat.
        </Typography>
      )}
      </Box>
    </Box>
  );
};

export default ChatBox;
