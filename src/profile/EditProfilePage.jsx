import React, { useState } from 'react';

const EditProfilePage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [photo, setPhoto] = useState(null);
    const [photoURL, setPhotoURL] = useState('');

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
        console.log({ name, email, photo });
    };

    return (
        <div className="edit-profile-container">
            <h1>Edit Profile</h1>
            <form onSubmit={handleSubmit} className="edit-profile-form">
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
