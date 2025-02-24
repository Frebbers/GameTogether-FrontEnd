import { useNavigate } from "react-router-dom";

const GroupPost = ({ id, name, owner, members, description, tags }) => {
    const navigate = useNavigate();

    return (
        <div className="group-post" onClick={() => navigate(`/group/${id}`)} style={{ cursor: "pointer" }}>
            <div className="group-post-header">
                <span>{name}</span>
                <span>{owner}</span>
                <span>Members: {members}</span>
            </div>
            <p className="description">{description}</p>
            <button className="join-button" onClick={(e) => {
                e.stopPropagation(); 
                navigate("/join-request");
            }}>
                Request to Join
            </button>
        </div>
    );
};

export default GroupPost;