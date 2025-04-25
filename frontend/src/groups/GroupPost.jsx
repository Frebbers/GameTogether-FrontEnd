import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Dialog from "../components/Dialog";
import { joinGroup } from "../services/apiService";

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
        if (members?.length > 0) {
            const owner = members.find((m => m.userId == ownerId));
            setOwnerName(owner?.username || "No Username");
        }
    }, [members, ownerId]);

    return (
        <div
            className="group-post"
            onClick={() => navigate(`/group/${id}/${ownerId}`)}
            style={{ cursor: "pointer" }}
        >
            <div className="group-post-header">
                <span>Group name: {title}</span>
                <span>Owner: {ownerName} </span>
                <span>Members: {members?.filter(m => m.groupStatus === 1).length ?? 0}/{maxMembers}</span>
            </div>

            <p className="description">{description}</p>

            <div className="members-list">
                <strong>Members:</strong>
                <ul>
                    {members?.length > 0 ? (
                        members.map((member, index) => {
                            if (member.groupStatus === 1) {
                                return (
                                    <li key={member.userId || index}>
                                        {member.username || "Unnamed Member"}
                                    </li>
                                );
                            }
                            return null;
                        })
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
                    <span className="group-post-tags">No tags</span>
                )}
            </div>

            <button onClick={openDialog}>Request to Join</button>
            {isDialogOpen && (
                <Dialog
                    title="Join Group"
                    message={`Do you want to join session #${id}?`}
                    onClose={closeDialog}
                    actions={
                        <>
                            <button onClick={closeDialog}>Cancel</button>
                            <button onClick={async () => {
                                try {
                                    await joinGroup(id);
                                    closeDialog();
                                    navigate("/");
                                    window.location.reload();
                                } catch (err) {
                                    alert(err.message);
                                }
                            }}>Confirm</button>
                        </>
                    }
                />
            )}
        </div>
    );
};

export default GroupPost;
