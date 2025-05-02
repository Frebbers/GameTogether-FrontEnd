import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import logo1 from "../images/logo.png";
import dd from "../images/d&d.png";
import games from "../images/games.png";
import background from "../images/background.jpg";

import LoginForm from "../common/LoginForm";
import RegisterForm from "../common/RegisterForm";
import { AuthContext } from "../context/AuthContext";

const LaunchingPage = () => {
    const [showRegister, setShowRegister] = useState(false);
    const { isLoggedIn } = useContext(AuthContext);
    const [filterTag, setFilterTag] = useState("");
    const navigate = useNavigate();

    if (!isLoggedIn) {
      return (
        <>
          {showRegister ? (
            <RegisterForm
              onRegisterSuccess={() => setShowRegister(false)}
              onShowLogin={() => setShowRegister(false)}
            />
          ) : (
            <LoginForm onShowRegister={() => setShowRegister(true)} />
          )}
        </>
      );
    }

    return (
        <div
            className="custom-container justify-content-center"
            style={{
                backgroundImage: `url(${background})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                minHeight: "100vh",
                paddingBottom: "15em",
            }}
        >
            <img src={logo1} alt="Launching Banner" className="launching-logo" />
            <div className="launching-page-text">
                <p>Your go-to place to find the best teammates to fit your needs and have a memorable time with.</p>
            </div>
            <div className="game-banners">
                <img src={dd} alt="D&D Banner" className="game-banner" onClick={() => {setFilterTag("D&D"); navigate("/home-page");}} />
                <img src={games} alt="Games Banner" className="game-banner" onClick={() => {setFilterTag("Other Game"); navigate("/home-page");}} />
            </div>
        </div>
    );
};

export default LaunchingPage;
