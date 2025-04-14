import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SimpleDialog from "../common/RequestJoinDialog";
import RequestJoinDialog from "../common/RequestJoinDialog";
import { fetchProfile } from "../services/apiService";


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

    // get username from API
    useEffect(() => {
    const getOwner = async () => {
        try {
        const owner = await fetchProfile(ownerId);
        setOwnerName(owner.name);
        } catch (error) {
        console.error("Error fetching user:", error);
        }
    };

    getOwner();
    }, []);

    return (
        <div
            className="group-post"
            onClick={() => navigate(`/group/${id}`)}
            style={{ cursor: "pointer" }}
        >
            <div className="group-post-header">
                <span>{title}</span>
                <span>Owner: {ownerName}</span>
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
