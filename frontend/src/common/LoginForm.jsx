import { useState, useContext } from "react";
import { login as apiLogin } from "../services/ApiService"; 
import { AuthContext } from "../context/AuthContext";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { login } = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const data = await apiLogin(email, password); 
            login(data.token);                        
        } catch (err) {
            setError(err.message || "Login failed.");
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
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
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;
