import { useState } from "react";
import { useNavigate } from "react-router-dom"; 

const ControlPanel = ({ NumberOfGroups, setFilterTag }) => { 
    const navigate = useNavigate();
    const [tag, setTag] = useState("All Games");

    function handleTagChange(event) {
        const selectedTag = event.target.value;
        setTag(selectedTag);
        setFilterTag(selectedTag);
    }

    return (
      <div className="control-panel">
        <div className="filter">
          <select value={tag} onChange={handleTagChange}>
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
