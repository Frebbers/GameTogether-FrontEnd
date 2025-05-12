import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import { joinGroup } from "../services/apiService";
import {Chip, Stack, Tabs, Tab, Box } from "@mui/material";

const GroupPost = ({
  id,
  title,
  ownerId,
  members,
  maxMembers,
  nonUserMembers = [],
  description,
  tags,
  ageRange
}) => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [ownerName, setOwnerName] = useState("");
  const [tabIndex, setTabIndex] = useState(0);

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
        className="custom-card card w-100"
        style={{
          cursor: "pointer",
          textAlign: "center",
          color: "white",
          padding: "1rem"
        }}
        onClick={() => navigate(`/group/${id}`)}
      >
        <div className="card-body d-flex flex-column h-100" style={{ color: "white" }}>
          <h5
            className="card-title"
            style={{ color: "white", fontSize: "1.2em", marginBottom: "0.5rem" }}
          >
            {title}
          </h5>

          <div
            onClick={(e) => e.stopPropagation()}
            style={{ marginBottom: "1rem" }}
          >
            <Tabs
              value={tabIndex}
              onChange={(e, newVal) => setTabIndex(newVal)}
              textColor="inherit"
              indicatorColor="primary"
              variant="fullWidth"
              size="small"
              sx={{
                minHeight: 36,
                "& .MuiTab-root": {
                  fontSize: "0.8rem",
                  padding: "4px 8px",
                  minHeight: 36
                }
              }}
            >
              <Tab label="Info" />
              <Tab label="Members" />
            </Tabs>
          </div>

          {tabIndex === 0 && (
            <Box sx={{ fontSize: "0.85em" }}>
              <div style={{ marginBottom: "0.25rem" }}>
                <strong>Owner:</strong> {ownerName}
              </div>
              <div style={{ marginBottom: "0.25rem" }}>
                <strong>Max Members:</strong> {maxMembers}
              </div>
              <div style={{ marginBottom: "0.5rem" }}>
                <strong>Age Range:</strong> {ageRange}
              </div>
              <Stack mt={3} direction="row" spacing={1} flexWrap="wrap" justifyContent="center">
                {tags?.length > 0 ? (
                  tags.map((tag, i) => (
                    <Chip key={i} label={tag} size="small" color="success" variant="filled" />
                  ))
                ) : (
                  <Chip label="No tags" size="small" variant="filled" color="error" />
                )}
              </Stack>
            </Box>
          )}

          {tabIndex === 1 && (
            <Box
              sx={{
                fontSize: "0.8em",
                marginBottom: "1rem",
                display: "flex",
                justifyContent: "center",
                gap: 20,
                flexWrap: "wrap"
              }}
            >
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
            </Box>
          )}
        </div>
      </div>

      {isDialogOpen && (
        <Modal
          title="Join Group"
          message={`Do you want to join session #${id}?`}
          onClose={() => setIsDialogOpen(false)}
          actions={
            <>
              <button className="btn btn-secondary me-2" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={async () => {
                  try {
                    await joinGroup(id);
                    setIsDialogOpen(false);
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
