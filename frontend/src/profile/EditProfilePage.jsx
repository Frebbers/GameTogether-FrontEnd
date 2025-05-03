import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserProfile, updateUserProfile } from "../services/apiService.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import background from "../images/background.jpg";
import defaultProfileIcon from '../images/default-profile-icon.png';

const EditProfilePage = () => {
    const navigate = useNavigate();
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
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Fetch user profile when the page loads
    useEffect(() => {
        async function loadProfile() {
            try {
                const profile = await fetchUserProfile();
                setFormData({
                    username: profile.username || "",
                    email: profile.email || "",
                    region: profile.region || "",
                    profilePicture: profile.profilePicture || "",
                    description: profile.description || "",
                    birthDate: profile.birthDate ? profile.birthDate.split('T')[0] : "",
                });
                if (profile.profilePicture && profile.profilePicture.startsWith("data:image")) {
                    setPreview(profile.profilePicture);
                } else {
                    setPreview(null);
                }
            } catch (error) {
                console.error("Failed to load profile:", error);
            } finally {
                setLoading(false);
            }
        }

        loadProfile();
    }, []);

    // Calculate age whenever birthDate changes
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
                })
            });

            console.log("Profile Updated Successfully!");
            navigate("/profile/me");
        } catch (error) {
            console.error("Error updating profile:", error);
        } finally {
            setSaving(false);
        }
    };

    // Today's date for date picker max
    const todayString = new Date().toISOString().split('T')[0];

    if (loading) {
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

                            <button
                                type="submit"
                                className="save-changes-button"
                                disabled={saving}
                                style={{ opacity: saving ? 0.7 : 1 }}
                            >
                                {saving ? "Saving..." : "Save Changes"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditProfilePage;
