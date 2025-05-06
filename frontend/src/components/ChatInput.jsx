import React, { useState } from "react";
import { IconButton, InputBase, Paper } from "@mui/material";

const ChatInput = ({ onSend }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSend(message.trim());
      setMessage("");
    }
  };

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
        onChange={(e) => setMessage(e.target.value)}
        inputProps={{ "aria-label": "type a message" }}
      />
    </Paper>
  );
};

export default ChatInput;
