import { useNavigate } from "react-router-dom";

const ControlPanel = () => { 
    const navigate = useNavigate();

    return (
      <div className="control-panel">
        <button>Filter</button>
        <span>Available groups: ???</span>
        <button className="create-button" onClick={() => navigate("/create")}>
          Create
        </button>
      </div>
    );
};

export default ControlPanel;
