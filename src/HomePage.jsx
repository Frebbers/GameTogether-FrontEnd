import ControlPanel from "./common/ControlPanal.jsx";
import GroupList from "./groups/GroupList.jsx";

const HomePage = ({ groups }) => {
  return (
    <div className="container">
      <h1>Available Groups</h1>
      <ControlPanel NumberOfGroups={groups.length} />

      {groups.length > 0 ? (
        <GroupList groups={groups} />
      ) : (
        <p className="no-groups-text">No available groups</p>
      )}
    </div>
  );
};

export default HomePage;
