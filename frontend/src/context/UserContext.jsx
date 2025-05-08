import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserProfile, updateUserProfile } from "../services/apiService";
import defaultProfileIcon from "../images/default-profile-icon.png";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  const reloadUser = async () => {
    try {
      let profile;
      let isFirstTime = false;
      
      try {
        profile = await fetchUserProfile();
      } catch (fetchError) {
        // First time: create a basic profile
        await updateUserProfile({
          body: JSON.stringify({
            birthDate: new Date('2000-01-01T00:00:00Z').toISOString(),
            profilePicture: "",
            description: "",
            region: "",
          }),
        });
        profile = await fetchUserProfile();
        isFirstTime = true;
      }

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

      // Redirect if first login
      if (isFirstTime) {
        navigate("/edit-profile", { replace: true });
      }

    } catch (error) {
      console.error("Failed to reload user profile:", error);
      setUser(null);
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