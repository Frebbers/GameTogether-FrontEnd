import { useUser } from "../context/UserContext";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchUserGroups, fetchProfile, fetchGroupsByUserId } from "../services/apiService";
import defaultProfileIcon from "../images/default-profile-icon.png";
import background from "../images/background.jpg";
import { Tabs, Tab, Box, Button, CircularProgress } from "@mui/material";
import "./ProfilePage.css";

const UserProfilePage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user, loading: userLoading } = useUser();

  const [profileData, setProfileData] = useState(null);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (userId === "me") {
        if (!user) return;
        setProfileData(user);
        try {
          const userGroups = await fetchUserGroups();
          setGroups(userGroups);
        } catch (error) {
          console.error("Failed to fetch groups:", error);
        } finally {
          setLoading(false);
        }
      } else {
        try {
          const data = await fetchProfile(userId);
            setProfileData({
              userId: data.userId,
              username: data.username,
              region: data.region,
              birthDate: data.birthDate,
              description: data.description,
              profilePicture: data.profilePicture?.startsWith("data:image")
                ? data.profilePicture
                : defaultProfileIcon,
            });
          try {
            const otherUserGroups = await fetchGroupsByUserId(userId);
            const visibleGroups = otherUserGroups.filter((g) => g.isVisible);
            setGroups(visibleGroups);
          } catch (groupError) {
            console.error("Failed to fetch user groups:", groupError);
            setGroups([]);
          }
        } catch (error) {
          console.error("Failed to fetch profile:", error);
          setProfileData(null);
          setGroups([]);
        } finally {
          setLoading(false);
        }
      }
    };

    if (!userLoading) {
      fetchData();
    }
  }, [userId, user, userLoading]);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const calculateAge = (birthDate) => {
    if (!birthDate) return "N/A";
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return `${age} years`;
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
        position: "relative",
      }}
    >
      {/* Go Back Button */}
          <Button
            variant="contained"
            color="error"
            onClick={() => navigate(-1)}
            style={{
              position: "fixed",
              top: "4rem",
              left: "2rem",
              padding: "10px",
              textAlign: "center",
            }}
          >
            Go Back
          </Button>
      {loading ? (
        <div
          className="custom-container"
          style={{
            minHeight: "45vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress color="inherit" />
        </div>
      ) : !profileData ? (
        <div
          className="custom-container"
          style={{
            minHeight: "45vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            textAlign: "center",
            padding: "2rem",
          }}
        >
          <h2>User Not Found</h2>
          <p>The user you are looking for does not exist or has been deleted.</p>
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
            onClick={() => navigate("/")}
          >
            Return Home
          </Button>
        </div>
      ) : (
        <div
          className="card p-4 fade-in-down"
          style={{
            marginBottom: "10em",
            maxWidth: "800px",
            minHeight: "45%",
            width: "100%",
            background: "rgba(27, 31, 59, 0.9)",
            color: "white",
            position: "relative",
            paddingBottom: "4rem",
          }}
        >
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              marginBottom: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            <Tabs
              value={tabIndex}
              onChange={handleTabChange}
              textColor="inherit"
              indicatorColor="primary"
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="Profile" />
              <Tab label="About Me" />
              <Tab label="Groups" />
            </Tabs>
            {userId === "me" && (
              <Button
                variant="contained"
                color="info"
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
              </Button>
            )}
          </Box>

          {tabIndex === 0 && (
            <Box>
              <div className="d-flex align-items-center gap-4">
                <img
                  src={profileData.profilePicture || defaultProfileIcon}
                  alt="Profile"
                  className="rounded-circle border"
                  style={{ width: "120px", height: "120px", objectFit: "cover" }}
                />
                <div>
                  <h3 className="mb-0">{profileData.username}</h3>
                </div>
              </div>

              <hr />

              <div className="row">
                {userId === "me" && user?.email && (
                  <div className="col-6 mb-2">
                    <strong>Email</strong>
                    <div>{user.email}</div>
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

          {tabIndex === 1 && (
            <Box
              className="description"
              sx={{
                maxHeight: "300px",
                overflowY: "auto",
                whiteSpace: "pre-wrap",
                marginBottom: "5rem", 
              }}
            >
              {profileData.description || "No description provided."}
            </Box>
          )}

          {tabIndex === 2 && (
            <Box>
              {groups.length > 0 ? (
                <ul className="list-group mt-3">
                  {groups.map((group) => {
                    const activeMembers = group.members?.filter((m) => m.groupStatus === 1) ?? [];
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
                        onClick={() => navigate(`/group/${group.id}/`)}
                      >
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                          <span>{group.title}</span>
                          <span style={{ fontSize: "0.9em" }}>
                            {total} / {max}
                          </span>
                        </Box>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="text-muted mt-3">
                  {userId === "me" ? "You are not part of any groups yet." : "No public groups to display."}
                </p>
              )}
            </Box>
          )}
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;
