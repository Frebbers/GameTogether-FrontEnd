import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchUserProfile, fetchUserGroups, fetchProfile } from "../services/apiService";
import defaultProfileIcon from "../images/default-profile-icon.png";
import background from "../images/background.jpg";
import { jwtDecode } from 'jwt-decode';
import "./ProfilePage.css";

const UserProfilePage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  
  const [profileData, setProfileData] = useState(null);
  const [groups, setGroups] = useState([]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data;
        if (userId === "me") {
          data = await fetchUserProfile();
          const claims = jwtDecode(localStorage.getItem('token'));
          setEmail(claims.email);
        } else {
          data = await fetchProfile(userId);
          setEmail(""); // Can't show email of other users unless you add it from backend.
        }

        setProfileData(data);

        if (userId === "me") {
          const userGroups = await fetchUserGroups();
          setGroups(userGroups);
        } else {
          setGroups([]); // No groups shown for other users, unless you want to expand.
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

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
          maxWidth: "700px",
          width: "100%",
          background: "rgba(27, 31, 59, 0.9)",
          color: "white",
        }}
      >
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
                      birthDate: profileData.birthDate 
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

        {/* About Me Accordion */}
        <div className="accordion mt-3" id="descriptionAccordion">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#descCollapse"
              >
                About Me
              </button>
            </h2>
            <div
              id="descCollapse"
              className="accordion-collapse collapse"
              data-bs-parent="#descriptionAccordion"
            >
              <div
                className="accordion-body"
                style={{ maxHeight: "350px", overflowY: "auto" }}
              >
                {profileData.description || "No description provided."}
              </div>
            </div>
          </div>
        </div>

        {/* Groups Accordion */}
        {userId === "me" && (
          <div className="accordion mt-4" id="groupsAccordion">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#groupsCollapse"
                >
                  Your Groups
                </button>
              </h2>
              <div
                id="groupsCollapse"
                className="accordion-collapse collapse"
                data-bs-parent="#groupsAccordion"
              >
                <div
                  className="accordion-body"
                  style={{ maxHeight: "350px", overflowY: "auto" }}
                >
                  {groups.length > 0 ? (
                    <ul className="list-group">
                      {groups.map((group) => (
                        <li
                          key={group.id}
                          className="list-group-item list-group-item-action"
                          style={{
                            backgroundColor: "rgba(27, 31, 59, 0.9)",
                            color: "white",
                            border: "none",
                            marginBottom: "8px",
                            borderRadius: "8px",
                          }}
                          onClick={() =>
                            navigate(`/group/${group.id}/${group.ownerId}`)
                          }
                        >
                          {group.title}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted">You are not part of any groups yet.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default UserProfilePage;
