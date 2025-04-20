import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {fetchUserProfile, fetchUserGroups} from "../services/ApiService.js";
import Header from "../common/Header.jsx";
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

                const groups = await fetchUserGroups();
                setMyGroups(groups);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <Header />
            <div className="profile-card">
            <div className="profile-details">
                    <h2>{name}</h2>
                    <h4><p>{"How old am i?: "+ age}</p></h4>
                    <h4><p>{"Region: "+ region}</p></h4>
                <div className="profile-image">
                    <img src={profilePicture} alt="Profile" />
                </div>
                    <p>{description}</p>
                    <div className="profile-groups">
                    <h2>My Groups</h2>
                    {myGroups.map((group) => (
                        <div key={group.id} className="group-post">
                            <h3>{group.title}</h3>
                            <p>Owner ID: {group.ownerId}</p>
                            <p>Members: {group.members?.length ?? 0}/{group.maxMembers}</p>
                            <p>{group.description}</p>
                            <div className="tags">
                                {group.tags?.length > 0 ? (
                                    group.tags.map((tag, index) => (
                                        <span key={index} className="tag">{tag}</span>
                                    ))
                                ) : (
                                    <span className="tag">No tags</span>
                                )}
                            </div>
                        </div>
                    ))}
                    <button className = "edit-profile-button" onClick={() => navigate('/edit-profile')}>Edit Profile</button>
                </div>
            </div>
        </div>
        </div>

    );
};

export default UserProfilePage;