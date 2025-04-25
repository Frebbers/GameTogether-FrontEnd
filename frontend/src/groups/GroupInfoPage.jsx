import { useParams, useNavigate } from "react-router-dom";
import { AcceptUserIntoGroup, fetchGroupById, fetchProfile, joinGroup, RejectUserFromGroup } from "../services/apiService";
import { useEffect, useState } from "react";
import Dialog from "../components/Dialog";
import styles from "./GroupInfoPage.module.css";
import { jwtDecode } from 'jwt-decode';

const GroupInfoPage = ({ groups, setGroups }) => {
    const { groupId } = useParams();
    const { ownerId } = useParams();
    const navigate = useNavigate();
    const [group, setGroup] = useState("");
    const [owner, setOwner] = useState("");
    const [memberProfiles, setMemberProfiles] = useState({});
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isPendingDialogOpen, setIsPendingDialogOpen] = useState(false);
    const claims = jwtDecode(localStorage.getItem('token'));
    const isGroupOwner = claims.nameid === ownerId;

    const openDialog = (e) => {
        e.stopPropagation();
        setIsDialogOpen(true);
    };

    const openPendingDialog = (e) => {
        e.stopPropagation();
        setIsPendingDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
    };

    const closePendingDialog = () => {
        setIsPendingDialogOpen(false);
    };

    useEffect(() => {
        fetchGroupById(groupId)
            .then((data) => {
                setGroup(data);
                console.log(data.members);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Failed to fetch session:", error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        fetchProfile(ownerId)
            .then((data) => {
                setOwner(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Failed to fetch owner profile:", error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (!group?.members) return;

        const fetchProfiles = async () => {
            const promises = group.members.map(async (member) => {
                try {
                    const profile = await fetchProfile(member.userId);
                    return { userId: member.userId, profile };
                } catch (err) {
                    console.error(`Failed to fetch profile for user ${member.userId}`, err);
                    return null;
                }
            });

            const results = await Promise.all(promises);
            const profilesById = {};
            results.forEach((res) => {
                if (res) profilesById[res.userId] = res.profile;
            });

            setMemberProfiles(profilesById);
        };

        fetchProfiles();
    }, [group.members]);

    if (!group) {
        return (
            <div className="">
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
        <div className={styles["group-info"]}>
            <div className={styles["header"]}>
                <h2 className={styles["title"]}>{group.title}</h2>
                <div className={styles["header-right"]}>
                    <span className={styles["age-range"]}>Age range: {group.ageRange} </span>
                    <span className={styles["tags"]}>
                        Tags:
                        {group.tags?.length > 0 ? (
                            group.tags.map((tag, index) => (
                                <span key={index} className="tag">{tag}</span>
                            ))
                        ) : (
                            <span className="tag">No tags</span>
                        )}
                    </span>
                </div>
            </div>

            <div className={`${styles.panel} ${styles["right-panel"]}`}>
            <p><strong>Members ({group.members.filter(m => m.groupStatus === 1).length + group.nonUserMembers.length}/{group.maxMembers}):</strong></p>

            {group.members.filter(m => m.groupStatus === 1).map(member => {
                const isOwner = Number(member.userId) === Number(ownerId);
                    return (
                        <div key={member.userId} className={styles.memberRow}>
                            <span>{member.username}</span>
                            {isOwner && (
                                <i style={{ color: "yellow", marginLeft: "0.5rem" }} className="fa-solid fa-star">(Owner)</i>
                            )}
                        </div>
                    );
            })}

            {group.nonUserMembers.map((member, index) => (
                <div key={index}>{member}</div>
            ))}
        </div>

            <div className={styles["footer-info"]}>
                <button onClick={openDialog}>Request to Join</button>
                {isDialogOpen && (
                    <Dialog
                        title="Join Group"
                        message={`Do you want to join session #${groupId}?`}
                        onClose={closeDialog}
                        actions={
                            <>
                                <button onClick={() => {
                                    closeDialog();
                                    navigate("/");
                                }}>Cancel</button>
                                <button onClick={async () => {
                                    try {
                                        await joinGroup(groupId);
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

        {isGroupOwner && (
            <button onClick={openPendingDialog}>Pending Users</button>
        )}
                    {isPendingDialogOpen && (
                        <Dialog
                            title="Pending Users"
                            message={group.members
                                .filter(m => m.groupStatus === 0)
                                .map(member => (
                                  <span key={member.userId}>{member.username}
                                  <button onClick={async () => {
                                        try {
                                            await AcceptUserIntoGroup(groupId, member.userId);
                                            const updatedGroup = await fetchGroupById(groupId);
                                            setGroup(updatedGroup);
                                        } catch (err) {
                                            alert(err.message);
                                        }
                                    }}>Accept</button>
                                  <button onClick={async () => {
                                        try {
                                            const reponse = await RejectUserFromGroup(groupId, member.userId);
                                            const updatedGroup = await fetchGroupById(groupId);
                                            setGroup(updatedGroup);
                                        } catch (err) {
                                            alert(err.message);
                                        }
                                    }}>Reject</button>
                                  </span>
                                ))}
                            onClose={closePendingDialog}
                            actions={
                                <>
                                    <button onClick={closePendingDialog}>Cancel</button>
                                </>
                            }
                        />
                    )}
                    </div>
                </div>
            );
        };

export default GroupInfoPage;
