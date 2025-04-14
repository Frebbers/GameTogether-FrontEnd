import { createContext, useState, useEffect, useCallback } from "react";
import { useIdleLogoutTimer } from "../hooks/useIdleLogoutTimer";

const IDLE_LOGOUT_TIME = 30 * 60 * 1000 // 30 minutes

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const login = (token) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
  };

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  }, []);

  useIdleLogoutTimer(isLoggedIn, () => {
    alert("Logged out due to inactivity.");
    logout();
    window.location.href = "/";
  }, IDLE_LOGOUT_TIME);

  useEffect(() => {
    const checkToken = () => setIsLoggedIn(!!localStorage.getItem("token"));
    window.addEventListener("storage", checkToken);
    return () => window.removeEventListener("storage", checkToken);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
