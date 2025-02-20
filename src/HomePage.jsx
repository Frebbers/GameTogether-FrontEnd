import ControlPanel from "./ControlPanal.jsx"
import GroupList from "./GroupList.jsx"

const HomePage = ({ openCreatePage }) => {
    return (
      <div className = "container">
        <h1>Available Groups</h1>
        <ControlPanel openCreatePage={openCreatePage} />
        <GroupList/>
      </div>
    );
  };
  
  export default HomePage;