import { Box, Paper, Typography } from "@mui/material";

const ChatMessage = ({ senderName, messageText, isCurrentUser }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: isCurrentUser ? "flex-end" : "flex-start",
        mb: 2,
        px: 1,
      }}
    >
      {/* Username above bubble */}
      <Typography
        variant="subtitle2"
        sx={{
          fontWeight: "bold",
          color: isCurrentUser ? "lightblue" : "lightgray",
          mb: 0.5,
        }}
      >
        {senderName}
      </Typography>

      {/* Chat bubble */}
      <Paper
        sx={{
          backgroundColor: isCurrentUser ? "primary.main" : "grey.800",
          color: "white",
          p: 1.5,
          borderRadius: 2,
          maxWidth: "70%",
          wordBreak: "break-word",
        }}
        elevation={3}
      >
        <Typography variant="body1">
          {messageText}
        </Typography>
      </Paper>
    </Box>
  );
};

export default ChatMessage;
