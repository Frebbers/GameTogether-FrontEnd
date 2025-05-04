import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [profilePicture, setProfilePicture] = useState(() => {
    return localStorage.getItem("profilePicture") || null;
  });

  useEffect(() => {
    if (profilePicture) {
      localStorage.setItem("profilePicture", profilePicture);
    }
  }, [profilePicture]);

  return (
    <UserContext.Provider value={{ profilePicture, setProfilePicture }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
