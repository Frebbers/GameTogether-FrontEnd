import { useEffect, useState } from "react";
import GroupPost from "./GroupPost.jsx";
import { fetchSessions } from "../services/apiService.js";

const GroupList = ({ filterTag, onGroupCountChange }) => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSessions()
      .then((data) => {
        setSessions(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch sessions:", error);
        setLoading(false);
      });
  }, []);

  const filteredSessions = sessions

  /*
  const filteredSessions = filterTag === "All Games"
    ? sessions
    : sessions.filter(session =>
        session.tags?.some(tag => tag.toLowerCase() === filterTag.toLowerCase())
      );
  */

  // Notify parent of group count
  useEffect(() => {
    if (onGroupCountChange) {
      onGroupCountChange(filteredSessions.length);
    }
  }, [filteredSessions, onGroupCountChange]);

  if (loading) {
    return <p>Loading sessions...</p>;
  }

  return (
    <div>
      {filteredSessions.length > 0 ? (
        filteredSessions.map((session) => (
          <GroupPost key={session.id} {...session} />
        ))
      ) : (
        <p className="no-groups-text">No sessions found for this category.</p>
      )}
    </div>
  );
};

export default GroupList;
