import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';
import BASE_URL from '../../config';

const ProfilePage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch(`${BASE_URL}/Users/get-profile`)
            .then((response) => response.json())
            .then((data) => setUser(data))
            .catch((error) => console.error('Error:', error));
    }, []);
    return (
        <div className="profile-container">
            <div className="profile-card">
                <h1 className="profile-title">User Profile</h1>
                <img 
                    className="profile-image" 
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfHlcmASZgNOAA0mtIwob78oSLwGP1PybjDQ&s" 
                    alt="Profile"
                /> 
                <p className="profile-details">Name: {user?.name || "Unknown"}</p>
                <p className="profile-details">Age: {user?.age || "Not provided"}</p>
                <p className="profile-details">Description: {user?.description || "None available"}</p>
                <p className="profile-details">Region: {user?.region || "No region registered"}</p>
                
                <button 
                    className="edit-profile-button"
                    onClick={() => navigate('/edit-profile', { state: user })}
                >
                    Edit Profile
                </button>
            </div>
        </div>
    );
};

export default ProfilePage;
