import { useState } from "react";
import Header from "./common/Header";
import ControlPanel from "./common/ControlPanel";
import GroupList from "./groups/GroupList";
import "./groups/groups.css";

const HomePage = ({ searchTerm, setSearchTerm }) => {
  const [filterTag, setFilterTag] = useState("All Games");
  const [groupCount, setGroupCount] = useState(0);

  return (
    <div className="container">
      <Header setFilterTag={setFilterTag} setSearchTerm={setSearchTerm} searchTerm={searchTerm} />

      <h1>Available Groups</h1>

      <ControlPanel
        NumberOfGroups={groupCount}
        filterTag={filterTag}
        setFilterTag={setFilterTag}
      />

      <GroupList
        filterTag={filterTag}
        onGroupCountChange={setGroupCount}
        searchTerm={searchTerm}
      />
    </div>
  );
};

export default HomePage;
