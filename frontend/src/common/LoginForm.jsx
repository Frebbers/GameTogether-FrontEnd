import { useState, useContext } from "react";
import { login as apiLogin } from "../services/apiService"; 
import { AuthContext } from "../context/AuthContext";
import background from "../images/background.jpg";

const LoginForm = ({ onShowRegister }) => {
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
            <div className="login-box">
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

                <p>
                    Don’t have an account?{" "}
                    <button onClick={onShowRegister}>Register</button>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;
