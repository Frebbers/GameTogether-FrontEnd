import { useState } from "react";
import { register } from "../services/apiService";
import background from "../images/background.jpg";

const RegisterForm = ({ onRegisterSuccess, onShowLogin }) => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const data = await register(email, username, password);
            setSuccess(data.message || "Registration successful!");
            setTimeout(() => onRegisterSuccess(), 1500);
        } catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data || "Registration failed. Please try again.");
            } else if (err.message) {
                setError(err.message);
            } else {
                setError("An unknown error occurred.");
            }
        }
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
                    {error && <p className="error-text">{error}</p>}
                    {success && <p className="success-text">{success}</p>}
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
