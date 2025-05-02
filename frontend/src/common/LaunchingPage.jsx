import { useState, useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import logo1 from "../images/logo.png";
import dd from "../images/d&d.png";
import games from "../images/games.png";
import background from "../images/background.jpg";
import Dialog from "../components/Dialog";

import LoginForm from "../common/LoginForm";
import RegisterForm from "../common/RegisterForm";
import { AuthContext } from "../context/AuthContext";

const LaunchingPage = () => {
  const [showRegister, setShowRegister] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);
  const [filterTag, setFilterTag] = useState("");
  const [searchParams] = useSearchParams();
  const [showVerificationDialog, setShowVerificationDialog] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const status = searchParams.get("verification");
    if (status === "success" || status === "failed") {
      setVerificationStatus(status);
      setShowVerificationDialog(true);
    }
  }, [searchParams]);

  const handleCloseDialog = () => {
    setShowVerificationDialog(false);
    window.history.replaceState({}, document.title, window.location.pathname);
  };

  return (
    <>
      {showVerificationDialog && (
        <Dialog
          title={verificationStatus === "success" ? "Email Verified!" : "Verification Failed"}
          message={
            verificationStatus === "success"
              ? "Your email has been verified successfully."
              : "Your email verification link is invalid or has expired."
          }
          onClose={handleCloseDialog}
          actions={<button onClick={handleCloseDialog}>OK</button>}
        />
      )}

      {!isLoggedIn ? (
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
      ) : (
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
      )}
    </>
  );
};

export default LaunchingPage;
