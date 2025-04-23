import { useState } from "react";
import { register } from "../services/apiService";


const RegisterForm = ({ onRegisterSuccess }) => {
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
            // Try to get the detailed error from the backend response
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
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input type="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                {error && <p className="error-text">{error}</p>}
                {success && <p className="success-text">{success}</p>}
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterForm;
