import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';

const ProfilePage = ({ name, email, description, tags }) => {
    const navigate = useNavigate();

    return (
        <div className="profile-container">
            <div className="profile-card">
                <h1 className="profile-title">User Profile</h1>
                <img 
                    className="profile-image" 
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfHlcmASZgNOAA0mtIwob78oSLwGP1PybjDQ&s" 
                    alt="Profile"
                /> 
                <p className="profile-details">Name: {name || "Unknown"}</p>
                <p className="profile-details">Email: {email || "Not provided"}</p>
                <p className="profile-details">Description: {description || "None available"}</p>
                <p className="profile-details">Tags: {tags || "No tags"}</p>
                <button 
                    className="edit-profile-button"
                    onClick={() => navigate('/edit-profile')}
                >
                    Edit Profile
                </button>
            </div>
        </div>
    );
};

export default ProfilePage;
