import React, { useState } from 'react';
import './ProfilePage.css';

const EditProfilePage = () => {
    const [tags, setTags] = useState("");
    const [photo, setPhoto] = useState(null);
    const [description, setDescription] = useState("");
    const [photoURL, setPhotoURL] = useState("");

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhoto(file);
            setPhotoURL(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Placeholder for form submission logic
        console.log({ description, tags, photo });
    };

    return (
        <div className="edit-profile-container">
            <h1>Edit Profile</h1>
                <img 
                    className="profile-image" 
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfHlcmASZgNOAA0mtIwob78oSLwGP1PybjDQ&s" 
                    alt="Profile"
                />
                
            <form onSubmit={handleSubmit} className="edit-profile-form">
                <div>

                    <label>Description:</label>
                    <input
                        className="description"
                        type="text"
                        placeholder="Enter your Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}

                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        className="tag"
                        type="tags"
                        placeholder="Enter your tags here with ',' in between each"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                    />
                </div>
                <div>
                    <label>Photo:</label>
                    <input type="file" accept="image/*" onChange={handlePhotoChange} />
                </div>
                {photoURL && <img src={photoURL} alt="Profile Preview" width="100" />}
                <button type="submit">Save</button>                
                </form>
                </div>
    );
};

export default EditProfilePage;
