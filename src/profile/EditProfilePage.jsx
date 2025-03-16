import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BASE_URL, AUTH_TOKEN } from '../../config';

const EditProfilePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { name, email, description, tags } = location.state || {};

    const [formData, setFormData] = useState({
        name: name || '',
        email: email || '',
        description: description || '',
        tags: tags ? tags.join(', ') : ''
    });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${BASE_URL}/Users/update-profile`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${AUTH_TOKEN}`
                },
                body: JSON.stringify({
                    name: formData.name,
                    description: formData.description,
                    tags: formData.tags.split(',').map(tag => tag.trim())
                })
            });

            if (!response.ok) throw new Error("Failed to update profile");

            console.log("Profile Updated:", await response.json());
            navigate(-1);
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    return (
        <div className="edit-profile-container">
            <h1>Edit Profile</h1>
            <form onSubmit={handleSubmit}>
                <label>Name: <input type="text" name="name" value={formData.name} onChange={handleChange} /></label>
                <label>Description: <textarea name="description" value={formData.description} onChange={handleChange} /></label>
                <label>Region: <input type="region" name="region" value={formData.email} onChange={handleChange} /></label>
                <label>Tags: <input type="text" name="tags" value={formData.tags} onChange={handleChange} /></label>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default EditProfilePage;
