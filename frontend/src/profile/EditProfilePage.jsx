import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { updateUserProfile } from "../services/apiService.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../common/Header";
import background from "../images/background.jpg";
import defaultProfileIcon from '../images/default-profile-icon.png';

const EditProfilePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [profile, setProfile] = useState();
    const { region, profilePicture, description, username, email } = location.state || {};
    const [preview, setPreview] = useState(
        profilePicture && profilePicture.startsWith("data:image")
          ? profilePicture
          : null
      );

    const [formData, setFormData] = useState({
        username: username || "",
        email: email || "",
        region: region || "",
        profilePicture: profilePicture || "",
        description: description || ""
    });

   

    const handleFileChange = (e) => {
        const uploadedFile = e.target.files[0];
        if (uploadedFile) {
          setFile(uploadedFile);
    
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreview(reader.result); // base64 image
          };
          reader.readAsDataURL(uploadedFile);
        }
      };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await updateUserProfile({
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    region: formData.region,
                    profilePicture: preview, // 👈 Send base64 string
                    description: formData.description,
                })
            });
    
            console.log("Profile Updated:", await response);
            navigate("/profile");
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    return (
        <>
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
                    <h1>Edit Profile</h1>
                    

                    <div className="edit-profile-content">
                        <form onSubmit={handleSubmit}>
                                Profile Picture:
                                <label style={{ cursor: 'pointer' }}>
                                <img
                                    src={preview || defaultProfileIcon}
                                    alt="Profile Icon"
                                    style={{
                                    width: 100,
                                    height: 100,
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                    border: '2px solid #ccc',
                                    marginTop: "10px"
                                    }}
                                />
                                </label>
                                <input
                                id="profile-upload"
                                type="file"
                                accept="image/png, image/jpeg, image/jpg"
                                style={{ display: "none" }}
                                onChange={handleFileChange}
                                />
                                <label htmlFor="profile-upload" style={{ cursor: 'pointer', marginLeft: '10px' }}>
                                    <FontAwesomeIcon icon="fa-solid fa-edit" style={{position: "relative", bottom: "100px", left: "50px"}} />
                                </label>
                                <div style={{borderBottom: "2px solid white", width: "100%", marginBottom:"4px"}} ></div>
                            <label htmlFor="description">Description:</label>
                            <textarea style={{marginBottom: "10px", minHeight: "150px", fontSize:"12px"}}
                                name="description"
                                value={formData.description}
                                placeholder={description}
                                onChange={handleChange}
                            />
            
                            <label htmlFor="region">Region:</label>
                            <input
                                style={{marginBottom: "10px"}}
                                type="text"
                                name="region"
                                placeholder={region}
                                value={formData.region}
                                onChange={handleChange}
                            />

                            <button
                                type="submit"
                                className="save-changes-button"
                            >
                                Save Changes
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditProfilePage;
