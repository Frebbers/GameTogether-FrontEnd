import { useState } from "react";
import { register } from "../services/apiService";
import background from "../images/background.jpg";
import Modal from "../components/Modal";

const RegisterForm = ({ onRegisterSuccess, onShowLogin }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
    <div
      className="custom-container"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        color: "white",
      }}
    >
      {showDialog && (
        <Modal
          title={dialogTitle}
          message={dialogMessage}
          onClose={handleCloseDialog}
          actions={
            <button className="btn btn-primary" onClick={handleCloseDialog}>
              OK
            </button>
          }
        />
      )}

      <div className="register-box">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Register</button>
        </form>

        <p style={{ marginTop: "20px" }}>
          Already have an account?{" "}
          <button onClick={onShowLogin}>Log In</button>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
