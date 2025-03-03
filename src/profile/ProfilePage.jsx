import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';

const ProfilePage = () => {
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
                <p className="profile-details"></p>
                <p className="profile-details">Name: {localStorage.getItem('name')}</p>
                <p className="profile-details">Email: {localStorage.getItem('email')}</p>
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
