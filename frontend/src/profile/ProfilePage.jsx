import { useUser } from "../context/UserContext";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchUserProfile, fetchUserGroups, fetchProfile } from "../services/apiService";
import defaultProfileIcon from "../images/default-profile-icon.png";
import background from "../images/background.jpg";
import { jwtDecode } from "jwt-decode";
import { Tabs, Tab, Box } from "@mui/material";
import "./ProfilePage.css";

const UserProfilePage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { setProfilePicture } = useUser();
  
  const [profileData, setProfileData] = useState(null);
  const [groups, setGroups] = useState([]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data;
        if (userId === "me") {
          data = await fetchUserProfile();
          const claims = jwtDecode(localStorage.getItem("token"));
          setEmail(claims.email);
        } else {
          data = await fetchProfile(userId);
          setEmail("");
        }

        setProfileData(data);
        const resolved = data.profilePicture?.startsWith("data:image")
           ? data.profilePicture
            : defaultProfileIcon;

           setProfilePicture(resolved);

        if (userId === "me") {
          const userGroups = await fetchUserGroups();
          setGroups(userGroups);
        } else {
          setGroups([]);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  if (loading) {
    return (
      <div className="custom-container" style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <h2>Loading Profile...</h2>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="custom-container" style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <h2>Profile Not Found</h2>
      </div>
    );
  }

  const resolvedProfilePicture =
    profileData.profilePicture && profileData.profilePicture.startsWith("data:image")
      ? profileData.profilePicture
      : defaultProfileIcon;

  const calculateAge = (birthDate) => {
    if (!birthDate) return "N/A";
    const birth = new Date(birthDate);
    const today = new Date();
    let calculatedAge = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      calculatedAge--;
    }
    return `${calculatedAge} years`;
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        padding: "2rem",
      }}
    >
      <div
        className="card p-4 fade-in-down"
        style={{
          marginBottom: "10em",
          maxWidth: "800px",
          minHeight: "45%",
          width: "100%",
          background: "rgba(27, 31, 59, 0.9)",
          color: "white",
        }}
      >
    <Box sx={{ borderBottom: 1, borderColor: "divider", marginBottom: 2 }}>
        <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            textColor="inherit"
            indicatorColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            >
            <Tab label="Profile" />
            {userId === "me" && <Tab label="Groups" />}
            <Tab label="About Me" />
        </Tabs>
    </Box>

    {/* Tab 0: Profile Info */}
    {tabIndex === 0 && (
        <Box>
        {/* Top Profile Section */}
        <div className="d-flex align-items-center gap-4">
            <img
            src={resolvedProfilePicture}
            alt="Profile"
            className="rounded-circle border"
            style={{ width: "120px", height: "120px", objectFit: "cover" }}
            />

            <div>
            <h3 className="mb-0">{profileData.username}</h3>
            </div>

            {userId === "me" && (
            <div className="ms-auto">
                <button
                className="btn btn-info text-white"
                onClick={() =>
                    navigate("/edit-profile", {
                    state: {
                        username: profileData.username,
                        region: profileData.region,
                        profilePicture: profileData.profilePicture,
                        description: profileData.description,
                        birthDate: profileData.birthDate,
                    },
                    })
                }
                >
                <i className="bi bi-pencil me-1"></i> EDIT
                </button>
            </div>
            )}
        </div>

        <hr />

        {/* Basic Info */}
        <div className="row">
            {email && (
            <div className="col-6 mb-2">
                <strong>Email</strong>
                <div>{email}</div>
            </div>
            )}
            <div className="col-6 mb-2">
            <strong>Region</strong>
            <div>{profileData.region || "N/A"}</div>
            </div>
            <div className="col-12 mb-2">
            <strong>Age</strong>
            <div>{calculateAge(profileData.birthDate)}</div>
            </div>
        </div>
        </Box>
    )}

    {/* Tab 1: Groups */}
    {tabIndex === 1 && userId === "me" && (
        <Box>
        {groups.length > 0 ? (
          <ul className="list-group mt-3">
            {groups.map((group) => {
              const activeMembers = group.members?.filter(m => m.groupStatus === 1) ?? [];
              const guestCount = group.nonUserMembers?.length ?? 0;
              const max = group.maxMembers ?? "?";
              const total = activeMembers.length + guestCount;
      
              return (
                <li
                  key={group.id}
                  className="list-group-item list-group-item-action profile-group-item"
                  style={{
                    backgroundColor: "rgba(27, 31, 59, 0.9)",
                    color: "white",
                    border: "none",
                    marginBottom: "8px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    boxShadow: "0 0 8px rgba(255, 255, 255, 0.15)",
                  }}
                  onClick={() => navigate(`/group/${group.id}/${group.ownerId}`)}
                >
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <span>{group.title}</span>
                    <span style={{ fontSize: "0.9em"}}>
                      {total} / {max}
                    </span>
                  </Box>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-muted mt-3">You are not part of any groups yet.</p>
        )}
      </Box>
    )}
    {tabIndex === 2 && (
    <Box>
        <p style={{ whiteSpace: "pre-wrap" }}>
        {profileData.description || "No description provided."}
        </p>
    </Box>
    )}
      </div>
    </div>
  );
};

export default UserProfilePage;
