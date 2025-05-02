import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserProfile, fetchUserGroups } from "../services/apiService.js";
import defaultProfileIcon from '../images/default-profile-icon.png';
import background from "../images/background.jpg";
import "./ProfilePage.css";

const UserProfilePage = () => {
    const [username, setUsername] = useState("");
    const [age, setAge] = useState("");
    const [region, setRegion] = useState("");
    const [profilePicture, setProfilePicture] = useState("");
    const [description, setDescription] = useState("");
    const [myGroups, setMyGroups] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await fetchUserProfile();
                setUsername(userData.username);
                setRegion(userData.region);
                setProfilePicture(userData.profilePicture);
                setDescription(userData.description);
                setAge(userData.age);

                const groups = await fetchUserGroups();
                setMyGroups(groups);
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
            className="custom-container justify-content-center"
            style={{
                backgroundImage: `url(${background})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                minHeight: "100vh",
                padding: "2rem",
                alignItems: "center"
            }}
        >
            <div className="edit-profile-container fade-in-down">
                <div className="edit-profile-content">
                    <h2 className="text-center mb-4">My Profile</h2>

                    <div className="text-center">
                        <img
                            src={resolvedProfilePicture}
                            alt="Profile"
                            className="profile-picture-preview"
                        />
                    </div>

                    <div className="profile-form">
                        <div>
                            <label>Username:</label>
                            <div>{username}</div>
                        </div>
                        <div>
                            <label>Age:</label>
                            <div>{age}</div>
                        </div>
                        <div>
                            <label>Region:</label>
                            <div>{region}</div>
                        </div>
                        <div>
                            <label>Description:</label>
                            <div className="profile-description">{description}</div>
                        </div>
                    </div>

                    <button
                        className="save-changes-button"
                        onClick={() =>
                            navigate("/edit-profile", {
                                state: { username, region, profilePicture, description },
                            })
                        }
                    >
                        Edit Profile
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserProfilePage;