import { useState, useRef, useEffect } from "react";
import { Paper, InputBase } from "@mui/material";

const ChatInput = ({ onSend, onTyping, chatId }) => {
  const [message, setMessage] = useState("");
  const stopTypingTimeoutRef = useRef(null);
  const lastTypingSentRef = useRef(0);

  const handleSend = () => {
    if (message.trim()) {
      onSend(message.trim());
      setMessage("");

      if (onTyping && chatId) {
          onTyping(chatId, true);
        }
      clearTimeout(stopTypingTimeoutRef.current);
    }
  };

  //In case a user navigates away from the page and not stuck in "is typing" forever
  useEffect(() => {
    return () => {
      if (onTyping && chatId) {
        onTyping(chatId, true);
      }
      clearTimeout(stopTypingTimeoutRef.current);
    };
  }, []);

  const handleChange = (e) => {
    const text = e.target.value;
    setMessage(text);

    const now = Date.now();
    if (onTyping && chatId && now - lastTypingSentRef.current > 1000) {
      onTyping(chatId, false);
      lastTypingSentRef.current = now;
    }

    clearTimeout(stopTypingTimeoutRef.current);
    stopTypingTimeoutRef.current = setTimeout(() => {
      onTyping(chatId, true);
    }, 3000);
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
        onChange={handleChange}
      />
    </Paper>
  );
};

export default ChatInput;
