import { useParams, useNavigate } from "react-router-dom";

const GroupInfoPage = ({ groups, setGroups }) => {
    const { groupId } = useParams();
    const navigate = useNavigate();

    const group = groups.find((g) => g.id === Number(groupId));

    if (!group) {
        return (
            <div className="container">
                <h1>Group Not Found</h1>
                <button className="back-button" onClick={() => navigate("/")}>Go Back</button>
            </div>
        );
    }

    const handleDelete = () => {
        setGroups((prevGroups) => prevGroups.filter((g) => g.id !== Number(groupId)));
        navigate("/");
    };

    return (
        <div className="container">
            <h1>{group.name}</h1>

            <div className="group-info">
                <p><strong>Owner:</strong> {group.owner}</p>
                <p className="members-info"><strong>Members:</strong> {group.members.length}/{group.maxMembers}</p>
                <p className="description-info"><strong>Description:</strong> {group.description}</p>

                <div className="members-list">
                    <strong>Members:</strong>
                    <ul>
                        {group.members.length > 0 ? (
                            group.members.map((member, index) => (
                                <li key={member.userId || index}>{member.username || "Unnamed Member"}</li>
                              ))                              
                        ) : (
                            <li>No members yet</li>
                        )}
                    </ul>
                </div>

                <div className="tags">
                    <strong>Tags:</strong>
                    {group.tags.length > 0 ? (
                        group.tags.map((tag, index) => <span key={index} className="tag">{tag}</span>)
                    ) : (
                        <span className="tag">No tags</span>
                    )}
                </div>

                <button 
                    className="join-button" 
                    onClick={() => navigate("/join-request")}
                >
                    Request to Join
                </button>

                <button 
                    className="delete-button" 
                    onClick={handleDelete}
                >
                    Delete Group
                </button>

                <button 
                    className="back-button" 
                    onClick={() => navigate("/")}
                >
                    Go Back
                </button>
            </div>
        </div>
    );
};

export default GroupInfoPage;
