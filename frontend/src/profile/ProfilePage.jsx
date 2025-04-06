import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {fetchUserProfile} from "../services/apiService.js";


const UserProfilePage = () => {
    const [name, setName] = useState(null);
    const [age, setAge] = useState(null);
    const [region, setRegion] = useState(null);
    const [profilePicture, setProfilePicture] = useState(null);
    const [description, setDescription] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchUserProfile()
                console.log(data);
                setName(data.name);
                console.log(data.name);
                setRegion(data.region);
                setProfilePicture(data.profilePicture);
                setDescription(data.description);
                setAge(data.age);
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
                <div className="profile-details">
                    <h2>{name}</h2>
                    <p>{description}</p>
                    <p>{region}</p>
                    <p>{age}</p>
                    <button onClick={() => navigate('/edit-profile')}>Edit Profile</button>
                </div>
            </div>
        </div>
    );
};

export default UserProfilePage;
