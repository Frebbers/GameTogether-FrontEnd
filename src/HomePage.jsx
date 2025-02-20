import ControlPanel from "./ControlPanal.jsx"
import GroupList from "./GroupList.jsx"

const HomePage = () => {

    return (
        <div className = "container">
            <ControlPanel></ControlPanel>
            <GroupList></GroupList>
        </div>
    );
}

export default HomePage