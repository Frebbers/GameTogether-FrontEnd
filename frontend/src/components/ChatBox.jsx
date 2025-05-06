import { useEffect, useState, useRef } from "react";
import { Box, Paper, Typography, Stack } from "@mui/material";
import { fetchGroupMessages, sendGroupMessage } from "../services/apiService";
import { WebSocketService } from "../services/websocketService";
import ChatInput from "./ChatInput";

const ChatBox = ({ groupId, chatId, currentUserId, canChat }) => {
  const [messages, setMessages] = useState([]);
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

    WebSocketService.connect(token, {
      chatId,
      onMessage: (data) => {
        try {
          const raw = JSON.parse(data);

          //To be sure there mess up on casing
          const msg = {
            messageId: raw.messageId ?? raw.MessageId,
            senderId: raw.senderId ?? raw.SenderId,
            senderName: raw.senderName ?? raw.SenderName,
            content: raw.content ?? raw.Content,
            timeStamp: raw.timeStamp ?? raw.TimeStamp,
            chatId: raw.chatId ?? raw.ChatId,
          };

          if (
            msg &&
            msg.content &&
            Number(msg.chatId) === Number(chatId)
          ) {
            setMessages((prev) => {
              const alreadyExists = prev.some(
                (m) => m.messageId === msg.messageId
              );
              if (alreadyExists) return prev;

              const updated = [...prev, msg];
              //For scrolling the container to the bottom when updated
              setTimeout(() => {
                messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
              }, 0);
              return updated;
            });
          }
        } catch (err) {
          console.warn("Invalid WebSocket message:", data);
        }
      },
    });

    return () => {
      WebSocketService.disconnect();
    };
  }, [chatId, canChat]);

  const handleSend = async (message) => {
    if (!message.trim()) return;

    try {
      await sendGroupMessage(groupId, { content: message });
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

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

      <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
        {canChat ? (
          <ChatInput onSend={handleSend} />
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
