import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ControlPanel = ({ NumberOfGroups }) => { 
    const navigate = useNavigate();
    const [tag, setTag] = useState("");

    function handleTagChange(event) {
        setTag(event.target.value);
    }

    return (
      <div className="control-panel">
        <div className="filter">
        <select value = {tag} onChange = {handleTagChange}>
            <option value = "">Filter</option>
            <option value = "tag1">Tag1</option>
            <option value = "tag2">Tag2</option>
            <option value = "tag3">Tag3</option>
        </select>
        </div>
        <span>Available groups: {NumberOfGroups}</span>
        <button className="create-button" onClick={() => navigate("/create")}> Create </button>
      </div>
    );
};

export default ControlPanel;
