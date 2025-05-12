import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUserProfile } from "../services/apiService.js";
import { useUser } from "../context/UserContext"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import background from "../images/background.jpg";
import defaultProfileIcon from '../images/default-profile-icon.png';

const EditProfilePage = () => {
    const navigate = useNavigate();
    const { user, reloadUser, loading: userLoading } = useUser(); 
    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        region: "",
        profilePicture: "",
        description: "",
        birthDate: "",
    });
    const [preview, setPreview] = useState(null);
    const [calculatedAge, setCalculatedAge] = useState(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username || "",
                email: user.email || "",
                region: user.region || "",
                profilePicture: user.profilePicture || "",
                description: user.description || "",
                birthDate: user.birthDate ? user.birthDate.split('T')[0] : "",
            });
            setPreview(user.profilePicture || null);
        }
    }, [user]);

    useEffect(() => {
        if (formData.birthDate) {
            const birth = new Date(formData.birthDate);
            const today = new Date();
            let age = today.getFullYear() - birth.getFullYear();
            const m = today.getMonth() - birth.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
                age--;
            }
            setCalculatedAge(age);
        }
    }, [formData.birthDate]);

    const handleFileChange = (e) => {
        const uploadedFile = e.target.files[0];
        if (uploadedFile) {
            setFile(uploadedFile);

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(uploadedFile);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            await updateUserProfile({
                body: JSON.stringify({
                    birthDate: formData.birthDate,
                    profilePicture: preview,
                    description: formData.description,
                    region: formData.region,
                }),
            });

            console.log("Profile Updated Successfully!");

            await reloadUser();
            navigate("/profile/me");
        } catch (error) {
            console.error("Error updating profile:", error);
        } finally {
            setSaving(false);
        }
    };

    const todayString = new Date().toISOString().split('T')[0];

    if (userLoading || !user) {
        return (
            <div className="custom-container" style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <h2>Loading Profile...</h2>
            </div>
        );
    }

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
                <div style={{marginTop: "8em"}} className="edit-profile-container fade-in-down">
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
                                <FontAwesomeIcon icon="fa-solid fa-edit" style={{ position: "relative", bottom: "100px", left: "50px" }} />
                            </label>

                            <div style={{ borderBottom: "2px solid white", width: "100%", marginBottom: "4px" }} ></div>

                            <label htmlFor="description">Description:</label>
                            <textarea
                                style={{ marginBottom: "10px", minHeight: "150px", fontSize: "12px" }}
                                name="description"
                                value={formData.description}
                                placeholder="Write something about yourself"
                                onChange={handleChange}
                            />

                            <label htmlFor="region">Region:</label>
                            <input
                                style={{ marginBottom: "10px" }}
                                type="text"
                                name="region"
                                placeholder="Enter your region"
                                value={formData.region}
                                onChange={handleChange}
                            />

                            <label htmlFor="birthDate">Birthdate:</label>
                            <input
                                style={{ marginBottom: "10px" }}
                                type="date"
                                name="birthDate"
                                value={formData.birthDate}
                                max={todayString}
                                onChange={handleChange}
                            />

                            {calculatedAge !== null && (
                                <div style={{ marginBottom: "10px" }}>
                                    Age: {calculatedAge} years
                                </div>
                            )}

                            <div style={{ display: "flex", gap: "1rem", marginTop: "1rem", flexWrap: "wrap" }}>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={() => navigate(-1)}
                                    sx={{ minWidth: 120 }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    disabled={saving}
                                    sx={{ minWidth: 120, opacity: saving ? 0.7 : 1 }}
                                >
                                    {saving ? "Saving..." : "Save Changes"}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditProfilePage;
