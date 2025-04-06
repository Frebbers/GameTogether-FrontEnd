import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {fetchUserProfile, fetchUserSessions} from "../services/apiService.js";
import "./ProfilePage.css";


const UserProfilePage = () => {
    const [name, setName] = useState(null);
    const [age, setAge] = useState(null);
    const [region, setRegion] = useState(null);
    const [profilePicture, setProfilePicture] = useState(null);
    const [description, setDescription] = useState(null);
    const navigate = useNavigate();
    const [myGroups, setMyGroups] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await fetchUserProfile();
                setName(userData.name);
                setRegion(userData.region);
                setProfilePicture(userData.profilePicture);
                setDescription(userData.description);
                setAge(userData.age);

                const groups = await fetchUserSessions();
                setMyGroups(groups);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="profile-container">
            <h1>User Profile</h1>
            <div className="profile-details">
                <div className="profile-picture">
                    <img src={profilePicture} alt="Profile" />
                </div>
                <div className="profile-info">
                    <h2>{name}</h2>
                    <p>{description}</p>
                    <p>{region}</p>
                    <p>{age}</p>
                    <button onClick={() => navigate('/edit-profile')}>Edit Profile</button>
                </div>
                <div className="profile-groups">
                    <h2>My Groups</h2>
                    {myGroups.map((session) => (
                        <div key={session.id} className="group-post">
                            <h3>{session.title}</h3>
                            <p>Owner ID: {session.ownerId}</p>
                            <p>Members: {session.members?.length ?? 0}/{session.maxMembers}</p>
                            <p>{session.description}</p>
                            <div className="tags">
                                {session.tags?.length > 0 ? (
                                    session.tags.map((tag, index) => (
                                        <span key={index} className="tag">{tag}</span>
                                    ))
                                ) : (
                                    <span className="tag">No tags</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserProfilePage;