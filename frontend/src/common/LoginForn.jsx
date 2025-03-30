import { useState } from "react";

const LoginForm = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

    try {
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
            },
            body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        throw new Error("Invalid credentials or not verified yet.");
    }

    const data = await response.json();
    localStorage.setItem("token", data.token);

    onLoginSuccess(data.token);

    } catch (err) {
        setError(err.message);
    }
};

    return (
        <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
            {error && <p className="error-text">{error}</p>}
            <button type="submit">Login</button>
        </form>
        </div>
    );
};

export default LoginForm;