import { useState } from "react";
import { useNavigate } from "react-router-dom";

const JoinRequestPage = () => {
    const navigate = useNavigate();
    
    return (
        <div className="container">
            <h1>Join Request</h1>
            <div className= "request-message">
                <textarea
                    className="request-message-input"
                    placeholder="Enter Join Request"
                ></textarea>
                <button className="create-button-2"> Send Request </button>
                <button className="cancel-button" onClick={() => navigate(-1)}> Go Back </button>
            </div>
        </div>
    );
};

export default JoinRequestPage;