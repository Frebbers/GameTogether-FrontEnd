import { useState, useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";

import { AuthContext } from "./context/AuthContext";
import { useUser } from "./context/UserContext"; 
import ControlPanel from "./common/ControlPanel";
import GroupList from "./groups/GroupList";
import LoginForm from "./common/LoginForm";
import RegisterForm from "./common/RegisterForm";
import Modal from "./components/Modal";

import background from "./images/background.jpg";
import "./groups/groups.css";

const HomePage = ({ searchTerm, setSearchTerm }) => {
  const { isLoggedIn } = useContext(AuthContext);

  const [filterTag, setFilterTag] = useState("All Games");
  const [groupCount, setGroupCount] = useState(0);
  const [showRegister, setShowRegister] = useState(false);

  const [searchParams] = useSearchParams();
  const [showVerificationDialog, setShowVerificationDialog] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState(null);

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

  if (!isLoggedIn) {
    return (
      <>
        {showVerificationDialog && (
          <Modal
            title={verificationStatus === "success" ? "Email Verified!" : "Verification Failed"}
            message={
              verificationStatus === "success"
                ? "Your email has been verified successfully."
                : "Your email verification link is invalid or has expired."
            }
            onClose={handleCloseDialog}
            actions={
              <button className="btn btn-primary" onClick={handleCloseDialog}>
                OK
              </button>
            }
          />
        )}

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
      className="position-relative d-flex flex-column flex-grow-1"
      style={{ zIndex: 1 }}
    >
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: 0,
        }}
      ></div>

      <div className="position-relative" style={{ zIndex: 1 }}>
        <ControlPanel
          NumberOfGroups={groupCount}
          filterTag={filterTag}
          setFilterTag={setFilterTag}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>

      <div
        className="flex-grow-1 overflow-auto position-relative"
        style={{ padding: "1rem", overflowY: "auto", height: "75vh" }}
      >
        <GroupList
          filterTag={filterTag}
          onGroupCountChange={setGroupCount}
          searchTerm={searchTerm}
        />
      </div>
    </div>
  );
};

export default HomePage;
