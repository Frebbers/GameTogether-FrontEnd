import { useState } from 'react';
        import { useLocation, useNavigate } from 'react-router-dom';
        import { updateUserProfile } from "../services/apiService.js";
        import Header from "../common/Header"; 

        const EditProfilePage = () => {
            const location = useLocation();
            const navigate = useNavigate();
            const { name, age, region, profilePicture, description } = location.state || {};

            const [formData, setFormData] = useState({
                name: name || "",
                age: age || "",
                region: region || "",
                profilePicture: profilePicture || "",
                description: description || ""
            });

            const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

            const handleSubmit = async (e) => {
                e.preventDefault();
                try {
                    const response = await updateUserProfile({
                        body: JSON.stringify({
                            name: formData.name,
                            age: formData.age,
                            region: formData.region,
                            profilePicture: formData.profilePicture,
                            description: formData.description,
                        })
                    });

                    console.log("Profile Updated:", await response);
                    navigate(-1);
                } catch (error) {
                    console.error("Error updating profile:", error);
                }
            };

            return (
                <div>
            <Header />
                <div className="edit-profile-container">
                <h1>Edit Profile</h1>
                    <div className="profile-picture-preview">
                        <img src="/images/profileimage.png" alt="Profile Preview" />
                    </div>
            
                <div className="edit-profile-content">
                    <form onSubmit={handleSubmit}>
                        <label>
                            Name:
                            <input type="text" name="name" value={formData.name} onChange={handleChange} />
                        </label>
                        <label>
                            Age:
                            <input type="number" name="age" value={formData.age} onChange={handleChange} />
                        </label>
                        <label>
                            Description:
                            <textarea name="description" value={formData.description} onChange={handleChange} />
                        </label>
                        <label>
                            Region:
                            <input type="text" name="region" value={formData.region} onChange={handleChange} />
                        </label>
                    </form>
                        <button className= "save-changes-button" type="submit">Save Changes</button>
            
                </div>
            </div>
            </div>
            
            
            );
        };

        export default EditProfilePage;