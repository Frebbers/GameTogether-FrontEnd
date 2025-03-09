import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const EditProfilePage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Retrieve the state data
    const { name, email, description, tags } = location.state || {};

    // Local state to edit the values
    const [formData, setFormData] = useState({
        name: name || '',
        email: email || '',
        description: description || '',
        tags: tags ? tags.join(', ') : ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here, you can update the profile (e.g., send data to an API)
        console.log('Updated Profile:', formData);
        navigate(-1); // Go back to profile page
    };

    return (
        <div className="edit-profile-container">
            <h1>Edit Profile</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                </label>
                <label>
                    Email:
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                </label>
                <label>
                    Description:
                    <textarea name="description" value={formData.description} onChange={handleChange} />
                </label>
                <label>
                    Tags (comma-separated):
                    <input type="text" name="tags" value={formData.tags} onChange={handleChange} />
                </label>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default EditProfilePage;
