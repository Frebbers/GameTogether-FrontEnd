import { useEffect, useState } from "react";
import GroupPost from "./GroupPost.jsx";
import { fetchGroups } from "../services/ApiService.js";

const GroupList = ({ filterTag, onGroupCountChange, searchTerm }) => {
  const [groups, setGroups] = useState([]);
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

  const filteredGroups = groups.filter((group) => {
    const matchesTag =
      filterTag === "All Games" ||
      group.tags?.some((tag) => tag.toLowerCase() === filterTag.toLowerCase());

    //Searches on title and description and can be expanded to include other properties
    const matchesSearch =
      group.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.description?.toLowerCase().includes(searchTerm.toLowerCase());

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
