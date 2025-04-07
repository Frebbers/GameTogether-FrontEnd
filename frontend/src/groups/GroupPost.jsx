import { useNavigate } from "react-router-dom";

const GroupPost = ({ id, title, ownerId, members, maxMembers, description, tags }) => {
    const navigate = useNavigate();

    return (
        <div
            className="group-post"
            onClick={() => navigate(`/group/${id}/${ownerId}`)}
            style={{ cursor: "pointer" }}
        >
            <div className="group-post-header">
                <span>{title}</span>
                <span>Owner ID: {ownerId}</span>
                <span>Members: {members?.length ?? 0}/{maxMembers}</span>
            </div>

            <p className="description">{description}</p>

            <div className="members-list">
                <strong>Members:</strong>
                <ul>
                    {members?.length > 0 ? (
                        members.map((member) => (
                            <li key={member.userId}>{member.name}</li>
                        ))
                    ) : (
                        <li>No members yet</li>
                    )}
                </ul>
            </div>

            <div className="tags">
                <strong>Tags:</strong>
                {tags?.length > 0 ? (
                    tags.map((tag, index) => (
                        <span key={index} className="tag">{tag}</span>
                    ))
                ) : (
                    <span className="tag">No tags</span>
                )}
            </div>

            <button
                className="join-button"
                onClick={(e) => {
                    e.stopPropagation();
                    navigate("/join-request");
                }}
            >
                Request to Join
            </button>
        </div>
    );
};

export default GroupPost;
