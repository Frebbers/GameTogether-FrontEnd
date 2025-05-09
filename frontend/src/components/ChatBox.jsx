import { useEffect, useState, useRef } from "react";
import { Box, Paper, Typography, Stack } from "@mui/material";
import { fetchGroupMessages, sendGroupMessage } from "../services/apiService";
import { WebSocketService } from "../services/websocketService";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";

const ChatBox = ({ groupId, chatId, currentUserId, canChat, participants = [] }) => {
  const [messages, setMessages] = useState([]);
  const [typingUserIds, setTypingUserIds] = useState([]);
  const typingTimeoutsRef = useRef({});
  const messagesEndRef = useRef(null);

  // Load initial chat messages
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
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Subscribe to websocket events
  useEffect(() => {
    if (!canChat) return;

    const unsubTyping = WebSocketService.subscribe("typing", (raw) => {
      if (Number(raw.chatId) !== Number(chatId)) return;
      if (raw.userId === Number(currentUserId)) return;
    
      const { userId, username } = raw;
      if (!username) return;
    
      setTypingUserIds((prev) => {
        if (prev.includes(userId)) return prev;
        return [...prev, userId];
      });
    });

    const unsubStopTyping = WebSocketService.subscribe("stopTyping", (raw) => {
      if (Number(raw.chatId) !== Number(chatId)) return;
      const userId = Number(raw.userId);
    
      setTypingUserIds((prev) => prev.filter(id => id !== userId));
    
      clearTimeout(typingTimeoutsRef.current[userId]);
    });

    const unsubMessage = WebSocketService.subscribe("message", (raw) => {
      if (Number(raw.chatId) !== Number(chatId)) return;

      const msg = {
        messageId: raw.messageId,
        senderId: raw.senderId,
        senderName: raw.senderName,
        content: raw.content,
        timeStamp: raw.timeStamp,
        chatId: raw.chatId,
      };

      setMessages((prev) => {
        const exists = prev.some((m) => m.messageId === msg.messageId);
        return exists ? prev : [...prev, msg];
      });
    });

    return () => {
      unsubTyping();
      unsubStopTyping();
      unsubMessage();
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

  const typingUsernames = typingUserIds
    .filter((id) => id !== Number(currentUserId))
    .map((id) => participants.find((p) => Number(p.userId) === id)?.username)
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
                <ChatMessage
                  key={msg.messageId}
                  senderName={isOwn ? "You" : msg.senderName}
                  messageText={msg.content}
                  isCurrentUser={isOwn}
                  timeStamp={msg.timeStamp}
                />
              );
            })}
          <div ref={messagesEndRef} />
          </Stack>
        </Box>
      </Paper>

      <Box sx={{ display: "flex",flexDirection: "column", alignItems: "center", pt: 0.5 }}>
      {canChat ? (
        <>
          {typingUsernames.length > 0 && (
            <Typography variant="caption" sx={{ color:"#000dff", fontSize: "11px", fontWeight: "600", px: 0.5, pt: 0.5, width: "100%" }}>
              {typingUsernames.join(", ")} {typingUsernames.length === 1 ? "is" : "are"} typing...
            </Typography>
          )}
          <ChatInput
            onSend={handleSend}
            onTyping={(chatId, stop = false) => {
              const type = stop ? "stopTyping" : "typing";
              const msg = { type, chatId };
              WebSocketService.send(msg);
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
