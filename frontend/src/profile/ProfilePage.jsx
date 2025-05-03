import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserProfile } from "../services/apiService";
import defaultProfileIcon from "../images/default-profile-icon.png";
import background from "../images/background.jpg";
import { jwtDecode } from 'jwt-decode';
import "./ProfilePage.css";

const UserProfilePage = () => {
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [region, setRegion] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [description, setDescription] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const navigate = useNavigate();
  const claims = jwtDecode(localStorage.getItem('token'));
  const email = claims.email;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchUserProfile();
        setUsername(userData.username);
        setRegion(userData.region);
        setProfilePicture(userData.profilePicture);
        setDescription(userData.description);
        setBirthDate(userData.birthDate);
        console.log(userData.birthDate);

        // Now dynamically calculate the age
        if (userData.birthDate) {
          const birth = new Date(userData.birthDate);
          const today = new Date();
          let calculatedAge = today.getFullYear() - birth.getFullYear();
          const m = today.getMonth() - birth.getMonth();
          if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
            calculatedAge--;
          }
          setAge(calculatedAge);
          console.log(calculatedAge);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, []);

  const resolvedProfilePicture =
    profilePicture && profilePicture.startsWith("data:image")
      ? profilePicture
      : defaultProfileIcon;

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
      <div className="card p-4 fade-in-down" style={{ marginBottom: "10em", maxWidth: "700px", width: "100%", background: "rgba(27, 31, 59, 0.9)", color: "white" }}>
        <div className="d-flex align-items-center gap-4">
          <img
            src={resolvedProfilePicture}
            alt="Profile"
            className="rounded-circle border"
            style={{ width: "120px", height: "120px", objectFit: "cover" }}
          />

          <div>
            <h3 className="mb-0">{username}</h3>
          </div>

          <div className="ms-auto">
            <button
              className="btn btn-info text-white"
              onClick={() =>
                navigate("/edit-profile", {
                  state: { username, region, profilePicture, description, birthDate }, 
                })
              }
            >
              <i className="bi bi-pencil me-1"></i> EDIT
            </button>
          </div>
        </div>

        <hr />

        <div className="row">
          <div className="col-6 mb-2"><strong>Email</strong><div>{email}</div></div>
          <div className="col-6 mb-2"><strong>Region</strong><div>{region}</div></div>
          <div className="col-12 mb-2"><strong>Age</strong><div>{typeof age === "number" ? `${age} years` : "N/A"}</div>
        </div>

        </div>

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
                {description || "No description provided."}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserProfilePage;
