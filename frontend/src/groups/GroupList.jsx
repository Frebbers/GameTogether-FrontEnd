import { useEffect, useState } from "react";
import GroupPost from "./GroupPost.jsx";
import { fetchGroups } from "../services/apiService.js";

const GroupList = ({ filterTag, onGroupCountChange, searchTerm }) => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGroups()
      .then((data) => {
        setGroups(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch groups:", error);
        setLoading(false);
      });
  }, []);

  const filteredSessions = sessions.filter((session) => {
    const matchesTag =
      filterTag === "All Games" ||
      session.tags?.some((tag) => tag.toLowerCase() === filterTag.toLowerCase());

    //Searches on title and description and can be expanded to include other properties
    const matchesSearch =
      session.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.description?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesTag && matchesSearch;
  });

  // Notify parent of group count
  useEffect(() => {
    if (onGroupCountChange) {
      onGroupCountChange(filteredGroups.length);
    }
  }, [filteredGroups, onGroupCountChange]);

  if (loading) {
    return <p>Loading groups...</p>;
  }

  return (
    <div>
      {filteredGroups.length > 0 ? (
        filteredGroups.map((group) => (
          <GroupPost key={group.id} {...group} />
        ))
      ) : (
        <p className="no-groups-text">No groups found for this category.</p>
      )}
    </div>
  );
};

export default GroupList;
