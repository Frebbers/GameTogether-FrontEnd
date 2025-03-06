import { useState } from "react";
import ControlPanel from "./common/ControlPanal.jsx";
import GroupList from "./groups/GroupList.jsx";
import './groups/groups.css';

const HomePage = ({ groups }) => {
  const [filterTag, setFilterTag] = useState("All Games");

  return (
    <div className="container">
      <h1>Available Groups</h1>
      
      <ControlPanel NumberOfGroups={groups.length} setFilterTag={setFilterTag} />

      {groups.length > 0 ? (
        <GroupList groups={groups} filterTag={filterTag} />
      ) : (
        <p className="no-groups-text">No available groups</p>
      )}
    </div>
  );
};

export default HomePage;
