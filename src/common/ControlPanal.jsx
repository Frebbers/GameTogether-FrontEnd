import { useNavigate } from "react-router-dom";

const ControlPanel = ({ NumberOfGroups, filterTag, setFilterTag }) => { 
    const navigate = useNavigate();

    function handleTagChange(event) {
        setFilterTag(event.target.value);
    }

    return (
      <div className="control-panel">
        <div className="filter">
          <select value={filterTag} onChange={handleTagChange}>
            <option value="All Games">All Games</option>
            <option value="D&D">D&D</option>
            <option value="Other Game">Other Game</option>
          </select>
        </div>
        <span>Available groups: {NumberOfGroups}</span>
        <button className="create-button" onClick={() => navigate("/create")}>Create</button>
      </div>
    );
};

export default ControlPanel;
