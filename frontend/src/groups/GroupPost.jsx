import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import RequestJoinDialog from "../common/RequestJoinDialog";

const GroupPost = ({ id, title, ownerId, members, maxMembers, description, tags }) => {
    const navigate = useNavigate();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [ownerName, setOwnerName] = useState("");

    const openDialog = (e) => {
        e.stopPropagation();
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
    };

    useEffect(() => {
        if(members?.length > 0){
            const owner = members.find((m => m.userId == ownerId));
            setOwnerName(owner?.username+"" || "No Username");
        }
    })

    return (
        <div
            className="group-post"
            onClick={() => navigate(`/group/${id}`)}
            style={{ cursor: "pointer" }}
        >
            <div className="group-post-header">
                <span>Group name: {title}</span>
                <span>Owner: {ownerName} </span>
                <span>Members: {members?.length ?? 0}/{maxMembers}</span>
            </div>

            <p className="description">{description}</p>

            <div className="members-list">
                <strong>Members:</strong>
                <ul>
                    {members?.length > 0 ? (
                        members.map((member, index) => (
                        <li key={member.userId || index}>
                            {member.username || "Unnamed Member"}
                        </li>
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
                        <span key={index} className="group-post-tags">{tag}</span>
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
