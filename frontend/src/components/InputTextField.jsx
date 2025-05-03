import React from "react";
import { TextField } from "@mui/material";

const InputTextField = ({ label, placeholder, type = "text", ...props }) => {
  return (
    <TextField
      variant="standard"
      fullWidth
      type={type}
      label={label}
      placeholder={placeholder}
      {...props}
      sx={{
        '& .MuiInputBase-input': {
          color: "white",
        },
        '& .MuiInputLabel-root': {
          color: "#ccc",
        },
        '& .MuiInputLabel-root.Mui-focused': {
          color: "#1e88e5",
        },
        '& .MuiInputBase-input::placeholder': {
          color: "white",
          opacity: 1,
        },
        '& .MuiInput-underline:before': {
          borderBottomColor: "#555",
        },
        '& .MuiInput-underline:hover:before': {
          borderBottomColor: "#888",
        },
        '& .MuiInput-underline:after': {
          borderBottomColor: "#1e88e5",
        },
        ...(props.sx || {}),
      }}
    />
  );
};

export default InputTextField;