import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SimpleDialog from "../common/RequestJoinDialog";
import RequestJoinDialog from "../common/RequestJoinDialog";


const GroupPost = ({ id, title, ownerId, members, maxMembers, description, tags }) => {
    const navigate = useNavigate();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const openDialog = (e) => {
        e.stopPropagation();
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
    };

    return (
        <div
            className="group-post"
            onClick={() => navigate(`/group/${id}`)}
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

            <button onClick={openDialog}>
                Request to Join
            </button>
            {isDialogOpen && <RequestJoinDialog sessionId={id} onClose={closeDialog} />}
        </div>
    );
};

export default GroupPost;
