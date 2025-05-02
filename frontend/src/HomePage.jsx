import { useState } from "react";
import ControlPanel from "./common/ControlPanel";
import GroupList from "./groups/GroupList";
import background from "./images/background.jpg";
import "./groups/groups.css";

const HomePage = ({ searchTerm, setSearchTerm }) => {
  const [filterTag, setFilterTag] = useState("All Games");
  const [groupCount, setGroupCount] = useState(0);

  return (
    <div
      className="position-relative d-flex flex-column flex-grow-1"
      style={{ zIndex: 1 }}
    >
      {/* Background Layer */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: 0,
        }}
      ></div>

      {/* Foreground Content */}
      <div className="position-relative" style={{ zIndex: 1 }}>
        <ControlPanel
          NumberOfGroups={groupCount}
          filterTag={filterTag}
          setFilterTag={setFilterTag}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>

      <div
        className="flex-grow-1 overflow-auto position-relative"
        style={{ padding: "1rem", overflowY: "auto", height: "75vh"}}
      >
        <GroupList
          filterTag={filterTag}
          onGroupCountChange={setGroupCount}
          searchTerm={searchTerm}
        />
      </div>
    </div>
  );
};

export default HomePage;
