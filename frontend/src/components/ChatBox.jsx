import { useEffect, useState, useRef } from "react";
import { Box, Paper, Typography, Stack } from "@mui/material";
import { fetchGroupMessages, sendGroupMessage } from "../services/apiService";
import ChatInput from "./ChatInput";

const ChatBox = ({ groupId ,chatId, currentUserId, canChat }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const prevMessagesLength = useRef(0);

  const loadMessages = async () => {
    try {
      const msgs = await fetchGroupMessages(chatId);
      setMessages(msgs);
    } catch (err) {
      console.error("Error loading chat messages:", err.message);
    }
  };

  useEffect(() => {
    if (messages.length > prevMessagesLength.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    prevMessagesLength.current = messages.length;
  }, [messages]);

  useEffect(() => {
    loadMessages();
    const interval = setInterval(loadMessages, 5000); // refresh every 5s
    return () => clearInterval(interval);
  }, [chatId]);

  const handleSend = async (message) => {
    if (!message.trim()) return;
  
    try {
      await sendGroupMessage(groupId, { content: message });
      await loadMessages();
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
          {messages.map((msg, idx) => {
            const isOwn = Number(msg.senderId) === Number(currentUserId);
            return (
              <Box
                key={idx}
                sx={{ display: "flex", justifyContent: isOwn ? "flex-end" : "flex-start" }}
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
