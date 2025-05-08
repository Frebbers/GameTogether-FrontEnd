import React, { useState, useCallback } from "react";
import { IconButton, InputBase, Paper } from "@mui/material";

const ChatInput = ({ onSend, onTyping, chatId }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSend(message.trim());
      setMessage("");
    }
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
    debounceTyping();
  };

  const debounceTyping = useCallback(
    debounce(() => {
      if (onTyping && chatId) {
        onTyping(chatId);
      }
    }, 1500),
    [onTyping, chatId]
  );

  return (
    <Paper
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSend();
      }}
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        px: 2,
        py: 1,
        backgroundColor: "rgba(27, 31, 59, 0.8)",
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1, color: "white" }}
        placeholder="Type a message..."
        value={message}
        onChange={handleChange}
        inputProps={{ "aria-label": "type a message" }}
      />
    </Paper>
  );
};

export default ChatInput;

function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}