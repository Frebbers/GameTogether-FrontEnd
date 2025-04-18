import { useParams, useNavigate } from "react-router-dom";
import { fetchGroupById, fetchProfile } from "../services/apiService";
import { useEffect, useState } from "react";
import styles from "./GroupInfoPage.module.css"

const GroupInfoPage = ({ groups, setGroups }) => {
    const { groupId } = useParams();
    const { ownerId } = useParams();
    const navigate = useNavigate();
    const [group, setGroup] = useState("");
    const [owner, setOwner] = useState("");
    const [memberProfiles, setMemberProfiles] = useState({});
    const [loading, setLoading] = useState(true);


    
    useEffect(() => {
        fetchGroupById(groupId)
        .then((data) => {
            setGroup(data);
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
        <div className={styles.container}>
            <h1>{group.name}</h1>

            <div className={styles.groupBody}>
                <div className={styles.info}>
                    <p><strong>Owner:</strong> {owner.username}</p>
                    <p className=""><strong>Members:</strong> {group.members.length}/{group.maxMembers}</p>
                    <p className=""><strong>Description:</strong> {group.description}</p>
                    <div className={styles.tags}>
                    <strong>Tags:</strong>
                    {group.tags.length > 0 ? (
                        group.tags.map((tag, index) => <span key={index} className="tag">{tag}</span>)
                    ) : (
                        <span className="">No tags</span>
                    )}
                </div>
                </div>
            
                <div className={styles.members}>
                        <strong>Members:</strong>
                        {group.members.map((member) => {
                            const profile = memberProfiles[member.userId];
                            return (
                            <div key={member.userId}>
                                {profile ? (
                                <div className={styles.profileCard}>
                                    <strong>Name: {profile.username}</strong>
                                    <span>Age: {profile.age}</span>
                                    <span>Description: {profile.description}</span>
                                </div>
                                ) : (
                                <span>Loading profile for {member.username}...</span>
                                )}
                            </div>
                            );
                        })}
                    </div>

                
                </div>
            </div>
    );
};

export default GroupInfoPage;
