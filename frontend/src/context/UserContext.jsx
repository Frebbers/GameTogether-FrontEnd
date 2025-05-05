import { createContext, useContext, useState, useEffect } from "react";
import { fetchUserProfile } from "../services/apiService";
import defaultProfileIcon from "../images/default-profile-icon.png";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const reloadUser = async () => {
    try {
      const profile = await fetchUserProfile();
      const resolvedProfilePicture = profile.profilePicture?.startsWith("data:image")
        ? profile.profilePicture
        : defaultProfileIcon;

      setUser({
        id: profile.id,
        username: profile.username,
        email: profile.email,
        region: profile.region,
        birthDate: profile.birthDate,
        description: profile.description,
        profilePicture: resolvedProfilePicture,
      });
    } catch (error) {
      console.error("Failed to reload user profile:", error);
      setUser(null); // clear user on failure
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      reloadUser().finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, reloadUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
