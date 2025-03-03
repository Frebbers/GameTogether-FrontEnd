import { useNavigate } from "react-router-dom";

const GroupPost = ({ id, name, owner, members, description, tags }) => {
    const navigate = useNavigate();

    return (
        <div className="group-post" onClick={() => navigate(`/group/${id}`)} style={{ cursor: "pointer" }}>
            <div className="group-post-header">
                <span>{name}</span>
                <span>Owner: {owner}</span>
                <span>Members: {members.length}</span>
            </div>
            <p className="description">{description}</p>

            <div className="members-list">
                <strong>Members:</strong>
                <ul>
                    {members.length > 0 ? (
                        members.map((member, index) => <li key={index}>{member}</li>)
                    ) : (
                        <li>No members yet</li>
                    )}
                </ul>
            </div>

            <div className="tags">
                <strong>Tags:</strong>
                {tags.length > 0 ? (
                    tags.map((tag, index) => <span key={index} className="tag">{tag}</span>)
                ) : (
                    <span className="tag">No tags</span>
                )}
            </div>

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
