import { useNavigate } from "react-router-dom";

const ControlPanel = ({ NumberOfGroups, filterTag, setFilterTag, searchTerm, setSearchTerm }) => {
  const navigate = useNavigate();
  
  return (
    <div className="container py-5" style={{borderBottom: "2px solid rgb(255, 255, 255)"}}>
      <div className="row g-3 align-items-center justify-content-between">
        <div className="col-md-3">
          <select
            className="form-select"
            value={filterTag}
            onChange={(e) => setFilterTag(e.target.value)}
          >
            <option value="All Games">All Games</option>
            <option value="D&D">D&D</option>
            <option value="Other Game">Other Game</option>
          </select>
        </div>

        <div className="col-md-5">
          <input
            className="form-control"
            type="text"
            placeholder="Search for groups..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="col-md-2 text-center text-md-start">
          <span className="text-light">Groups: {NumberOfGroups}</span>
        </div>

        <div className="col-md-2 text-end">
          <button className="btn btn-primary w-100" onClick={() => navigate("/create")}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
