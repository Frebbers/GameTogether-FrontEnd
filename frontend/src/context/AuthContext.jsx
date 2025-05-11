import { createContext, useState, useEffect, useCallback } from "react";
import { validateToken } from "../services/apiService";
import { useIdleLogoutTimer } from "../hooks/useIdleLogoutTimer";
import Modal from "../components/Modal";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [showWarning, setShowWarning] = useState(false);
  const [showLoggedOut, setShowLoggedOut] = useState(false);
  const [idleSignal, setIdleSignal] = useState(0);

  const login = (token) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
  };

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setShowWarning(false);
    console.log("is logged out...?");
  }, []);

  const cancelLogout = () => {
    setShowWarning(false);
    setIdleSignal((prev) => prev + 1);
  };

  const handleLoggedOutClose = () => {
    setShowLoggedOut(false);
  };

  useEffect(() => {
    setShowWarning(false);
  }, [idleSignal]);

  useIdleLogoutTimer(
    isLoggedIn,
    () => {
      setShowLoggedOut(true);
      logout();
    },
    undefined,
    () => setShowWarning(true),
    setIdleSignal
  );

  useEffect(() => {
    const checkTokenValidity = async () => {
      const isValid = await validateToken();
      if (!isValid) {
        logout();
      }
    };
  
    checkTokenValidity();
  
    const syncLoginStatus = async () => {
      const isValid = await validateToken();
      if (!isValid) {
        logout();
      }
    };
  
    window.addEventListener("storage", syncLoginStatus);
    return () => window.removeEventListener("storage", syncLoginStatus);
  }, [logout]);
  
  
  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}

      {showWarning && (
        <Modal
          title="Inactive Warning"
          message="You will be logged out in 5 minutes due to inactivity."
          onClose={cancelLogout}
          actions={
            <button className="btn btn-primary" onClick={cancelLogout}>
              OK
            </button>
          }
        />
      )}

      {showLoggedOut && (
        <Modal
          title="Logged Out"
          message="You have been logged out due to inactivity."
          onClose={handleLoggedOutClose}
          actions={
            <button className="btn btn-primary" onClick={handleLoggedOutClose}>
              OK
            </button>
          }
        />
      )}
    </AuthContext.Provider>
  );
}
