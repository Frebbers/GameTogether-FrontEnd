import { useState } from "react";

const RegisterForm = ({ onRegisterSuccess }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                // Parse JSON only if response is not OK
                const errorData = await response.json();
                throw new Error(errorData.error || "Registration failed.");
            }

            const data = await response.json();
            setSuccess(data.message || "Registration successful! Redirecting...");

            setTimeout(() => onRegisterSuccess(), 1500);

        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
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