import { useState } from "react";
import { register } from "../services/apiService";
import { Button, Paper, Typography, Box } from "@mui/material";
import background from "../images/background.jpg";
import Modal from "../components/Modal";
import InputTextField from "../components/InputTextField";

const RegisterForm = ({ onRegisterSuccess, onShowLogin }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // NEW
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setShowDialog(false);

    if (password !== confirmPassword) {
      setError("Passwords do not match."); // Password check
      return;
    }

    try {
      const data = await register(email, username, password);
      setSuccess(data.message || "Registration successful!");
      setDialogTitle("Registration Successful!");
      setDialogMessage("Please check your email to verify your account.");
      setShowDialog(true);
    } catch (err) {
      let errorMessage = "An unknown error occurred.";
      if (err.response && err.response.data) {
        errorMessage = err.response.data || "Registration failed. Please try again.";
      } else if (err.message) {
        errorMessage = err.message;
      }
      setError(errorMessage);
      setDialogTitle("Registration Failed");
      setDialogMessage(errorMessage);
      setShowDialog(true);
    }
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    onRegisterSuccess();
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
      }}
    >
      {showDialog && (
        <Modal
          title={dialogTitle}
          message={dialogMessage}
          onClose={handleCloseDialog}
          actions={
            <Button onClick={handleCloseDialog} variant="contained">
              OK
            </Button>
          }
        />
      )}

      <Paper
        elevation={10}
        sx={{
          padding: 5,
          borderRadius: 4,
          maxWidth: 400,
          width: "100%",
          backgroundColor: "rgba(27, 31, 59, 0.9)",
          color: "white",
          boxShadow: "0 0 30px rgba(0,0,0,0.5)",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Register
        </Typography>

        <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <InputTextField
            label="Username"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <InputTextField
            label="Email"
            placeholder="iama@gamer.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <InputTextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <InputTextField
            label="Confirm Password" // NEW FIELD
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {error && (
            <Typography color="error" variant="body2" align="center">
              {error}
            </Typography>
          )}

          <Button type="submit" variant="contained" fullWidth size="large" sx={{ fontWeight: "bold" }}>
            Register
          </Button>
        </form>

        <Typography variant="body2" align="center" sx={{ marginTop: 3 }}>
          Already have an account?{" "}
          <Button onClick={onShowLogin} variant="text" sx={{ color: "#90caf9", textTransform: "none" }}>
            Log In
          </Button>
        </Typography>
      </Paper>
    </Box>
  );
};

export default RegisterForm;
