import { useState, useContext } from "react";
import { TextField, Button, Paper, Typography, Box } from "@mui/material";
import { login as apiLogin } from "../services/apiService";
import { AuthContext } from "../context/AuthContext";
import { useUser } from "../context/UserContext";
import InputTextField from "../components/InputTextField";
import background from "../images/background.jpg";

const LoginForm = ({ onShowRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useContext(AuthContext);
  const { reloadUser } = useUser(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await apiLogin(email, password);
      login(data.token);          
      await reloadUser();           
    } catch (err) {
      setError(err.message || "Login failed.");
    }
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
          Login
        </Typography>

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
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

          {error && (
            <Typography color="error" variant="body2" align="center">
              {error}
            </Typography>
          )}

          <Button type="submit" variant="contained" color="primary" fullWidth size="large" sx={{ fontWeight: "bold" }}>
            Login
          </Button>
        </form>

        <Typography variant="body2" align="center" sx={{ marginTop: 3 }}>
          Don’t have an account?{" "}
          <Button onClick={onShowRegister} variant="text" sx={{ color: "#90caf9", textTransform: "none" }}>
            Register
          </Button>
        </Typography>
      </Paper>
    </Box>
  );
};

export default LoginForm;
