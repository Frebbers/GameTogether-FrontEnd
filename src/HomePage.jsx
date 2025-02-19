import ControlPanel from "./ControlPanal.jsx"
import GroupList from "./GroupList.jsx"

const HomePage = () => {

    return (
        <div className = "bg-blue-900 min-h-screen p-4">
            <ControlPanel></ControlPanel>
            <GroupList></GroupList>
        </div>
    );
}

export default HomePage