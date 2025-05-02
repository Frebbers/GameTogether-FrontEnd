import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Dialog from "../components/Dialog";
import { joinGroup } from "../services/apiService";

const GroupPost = ({ id, title, ownerId, members, maxMembers,nonUserMembers = [], description, tags }) => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [ownerName, setOwnerName] = useState("");

  const openDialog = (e) => {
    e.stopPropagation();
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  useEffect(() => {
    if (members?.length > 0) {
      const owner = members.find((m) => m.userId == ownerId);
      setOwnerName(owner?.username || "No Username");
    }
  }, [members, ownerId]);

  const activeMembers = members?.filter((m) => m.groupStatus === 1) ?? [];

  return (
    <div className="col-md-4 mb-4">
      <div
        className="custom-card card h-100"
        onClick={() => navigate(`/group/${id}/${ownerId}`)}
        style={{ cursor: "pointer", textAlign:"center", color:"#eee"}}
      >
        <div className="card-body d-flex flex-column">
          <h5 className="card-title text-primary">{title}</h5>
          <h6 className="card-subtitle mb-2">Owner: {ownerName}</h6>

          <div className="d-flex justify-content-center gap-4 mb-2 flex-wrap">
            {/* Active members */}
            <div>
                <strong>Members</strong>
                <ul className="list-unstyled mb-0">
                {activeMembers.length > 0 ? (
                    activeMembers.map((member, index) => (
                    <li key={`user-${member.userId || index}`}>
                        {member.username || "Unnamed"}
                    </li>
                    ))
                ) : (
                    <li className="text-muted fst-italic">None</li>
                )}
                </ul>
            </div>

            {/* Guest members */}
            <div>
                <strong>Guests</strong>
                <ul className="list-unstyled mb-0">
                {nonUserMembers.length > 0 ? (
                    nonUserMembers.map((name, index) => (
                    <li key={`guest-${index}`} className="fst-italic">
                        {name}
                    </li>
                    ))
                ) : (
                    <li className="fst-italic">None</li>
                )}
                </ul>
            </div>
            </div>

          <div className="mb-3">
            <div className="d-flex flex-wrap gap-1 mt-1">
              {tags?.length > 0 ? (
                tags.map((tag, i) => (
                  <span key={i} className="badge bg-secondary">{tag}</span>
                ))
              ) : (
                <span className="badge bg-light text-dark">No tags</span>
              )}
            </div>
          </div>

          <button
            className="btn btn-outline-success mt-auto"
            onClick={(e) => {
              e.stopPropagation();
              openDialog(e);
            }}
          >
            Request to Join
          </button>
        </div>
      </div>

      {isDialogOpen && (
        <Dialog
          title="Join Group"
          message={`Do you want to join session #${id}?`}
          onClose={closeDialog}
          actions={
            <>
              <button className="btn btn-secondary me-2" onClick={closeDialog}>
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={async () => {
                  try {
                    await joinGroup(id);
                    closeDialog();
                    navigate("/");
                    window.location.reload();
                  } catch (err) {
                    alert(err.message);
                  }
                }}
              >
                Confirm
              </button>
            </>
          }
        />
      )}
    </div>
  );
};

export default GroupPost;
