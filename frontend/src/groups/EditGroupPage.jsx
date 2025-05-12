import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { fetchGroupById, fetchUserProfile, updateGroup } from "../services/apiService";
import { Stack } from "@mui/material";
import background from "../images/background.jpg";
import Modal from "../components/Modal";

const predefinedTags = ["D&D", "Other Game"];
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const EditGroupPage = ({ setGroups }) => {
  const { groupId } = useParams();
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [groupName, setGroupName] = useState("");
  const [maxMembers, setMaxMembers] = useState("10");
  const [members, setMembers] = useState([]);
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [newMemberName, setNewMemberName] = useState("");
  const [messageDialog, setMessageDialog] = useState({ open: false, message: "" });

  const [isVisible, setIsVisible] = useState(true);
  const [ageFrom, setAgeFrom] = useState("");
  const [ageTo, setAgeTo] = useState("");

  const showMessage = (msg) => {
    setMessageDialog({ open: true, message: msg });
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const user = await fetchUserProfile();
        setUserName(user.username);

        const group = await fetchGroupById(groupId);
        setGroupName(group.title);
        setIsVisible(group.isVisible);
        const [from, to] = group.ageRange.split("-").map((v) => v.trim());
        setAgeFrom(from);
        setAgeTo(to);
        setMaxMembers(group.maxMembers.toString());
        setDescription(group.description);
        setTags(group.tags || []);
        setMembers([user.username, ...(group.nonUserMembers || [])]);
      } catch (err) {
        console.error("Failed to fetch group or user data", err);
        showMessage("Failed to load group data.");
      }
    };
    loadData();
  }, [groupId]);

  const AddMember = () => {
    if (members.length >= parseInt(maxMembers || "0", 10)) {
      showMessage("Maximum number of members reached.");
      return;
    }
    setNewMemberName("");
    setShowDialog(true);
  };

  const handleAddMember = () => {
    const name = newMemberName.trim();
    if (name && !members.includes(name)) {
      setMembers((prev) => [...prev, name]);
    }
    setShowDialog(false);
  };

  const toggleTag = (tag) => {
    setTags((prevTags) =>
      prevTags.includes(tag) ? prevTags.filter((t) => t !== tag) : [...prevTags, tag]
    );
  };

  const SaveChanges = async () => {
    const from = parseInt(ageFrom, 10);
    const to = parseInt(ageTo, 10);
    const max = parseInt(maxMembers, 10);

    if (!groupName.trim()) {
      showMessage("Group name cannot be empty.");
      return;
    }

    if (isNaN(from) || isNaN(to) || isNaN(max)) {
      showMessage("Please enter valid numbers for age range and max members.");
      return;
    }

    if (from > to) {
      showMessage("Minimum age cannot be greater than maximum age.");
      return;
    }

    if (from < 12 || to > 130 || max > 199) {
      showMessage("One or more values are out of allowed bounds.");
      return;
    }

    const groupData = {
      title: groupName,
      isVisible,
      ageRange: `${from} - ${to}`,
      maxMembers: max,
      description,
      tags,
      nonUserMembers: members.filter((m) => m !== userName),
    };

    try {
      const updated = await updateGroup(groupId, groupData);
      setGroups((prevGroups) =>
        prevGroups.map((g) => (g.id === updated.id ? updated : g))
      );
      navigate("/");
    } catch (error) {
      console.error("Error updating group:", error);
      showMessage("Failed to update group. Please try again.");
    }
  };

  return (
    <div
      className="custom-container d-flex justify-content-center align-items-center"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        paddingTop: "40px",
        paddingBottom: "80px",
      }}
    >
      <div
        className="group-post"
        style={{
          width: "100%",
          maxWidth: "600px",
          background: "rgba(27, 31, 59, 0.9)",
          borderRadius: "1rem",
          padding: "2rem",
          color: "white",
          boxShadow: "0 0 20px rgba(0,0,0,0.5)",
          scale: "0.8"
        }}
      >
        <h1 className="text-center mb-3">Edit Group</h1>

        <div className="group-post-header mb-2 d-flex flex-column align-items-center">
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Enter Group Name"
            style={{
              marginBottom: "5px",
              padding: "10px",
              fontSize: "14px",
              borderRadius: "8px",
            }}
          />
          <div className="d-flex justify-content-between w-100">
            <div>
              <label>Owner:</label>
              <span id="owner">{userName}</span>
            </div>
            <span className="member-count">
              Members: {members.length}/{maxMembers}
            </span>
          </div>
        </div>

        <div className="mb-2 w-100" style={{ textAlign: "left" }}>
          <div className="mb-2">
            <label className="form-label">Visibility:</label>
            <select
              className="form-select"
              style={{ backgroundColor: "#4A4E54", color: "white", border: "none", width: "250px" }}
              value={isVisible}
              onChange={(e) => setIsVisible(e.target.value === "true")}
            >
              <option value="true">Public</option>
              <option value="false">Private</option>
            </select>
          </div>

          <div className="mb-2">
            <label className="form-label">Age Range:</label>
            <div className="d-flex align-items-center" style={{ gap: "10px" }}>
              <input
                type="number"
                value={ageFrom}
                onChange={(e) => setAgeFrom(e.target.value)}
                onBlur={() => {
                  if (ageFrom !== "") {
                    const clamped = clamp(parseInt(ageFrom), 12, 130);
                    setAgeFrom(clamped.toString());
                    const currentMax = parseInt(ageTo);
                    if (!isNaN(currentMax) && currentMax < clamped) {
                      setAgeTo(clamped.toString());
                    }
                  }
                }}
                placeholder="Min"
                style={{
                  width: "70px",
                  backgroundColor: "#4A4E54",
                  color: "white",
                  padding: "6px",
                  fontSize: "14px",
                  borderRadius: "8px",
                  border: "none",
                  textAlign: "center",
                }}
              />
              to
              <input
                type="number"
                value={ageTo}
                onChange={(e) => setAgeTo(e.target.value)}
                onBlur={() => {
                  if (ageTo !== "") {
                    const min = parseInt(ageFrom) || 12;
                    const clamped = clamp(parseInt(ageTo), min, 130);
                    setAgeTo(clamped.toString());
                  }
                }}
                placeholder="Max"
                style={{
                  width: "70px",
                  backgroundColor: "#4A4E54",
                  color: "white",
                  padding: "6px",
                  fontSize: "14px",
                  borderRadius: "8px",
                  border: "none",
                  textAlign: "center",
                }}
              />
            </div>
          </div>

          <div className="mb-2">
            <label className="form-label">Max Members:</label>
            <input
              type="number"
              value={maxMembers}
              onChange={(e) => setMaxMembers(e.target.value)}
              onBlur={() => {
                const parsed = parseInt(maxMembers);
                if (isNaN(parsed)) {
                  setMaxMembers("1");
                } else {
                  setMaxMembers(clamp(parsed, 1, 199).toString());
                }
              }}
              placeholder="Max members"
              style={{
                width: "200px",
                backgroundColor: "#4A4E54",
                color: "white",
                padding: "8px",
                fontSize: "14px",
                borderRadius: "8px",
                border: "none",
                textAlign: "center",
              }}
            />
          </div>
        </div>

        <textarea
          style={{ marginBottom: "10px", minHeight: "150px", fontSize: "12px" }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter Group Description"
        ></textarea>

        <button className="btn btn-primary d-block mx-auto mb-2" onClick={AddMember}>
          Add Member
        </button>

        <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="center" mb={2}>
          {members.map((member, index) => (
            <button
              key={index}
              onClick={() => {
                if (member !== userName) {
                  setMembers((prev) => prev.filter((m) => m !== member));
                }
              }}
              disabled={member === userName}
              style={{
                backgroundColor: member === userName ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.08)",
                color: "white",
                padding: "6px 12px",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.2)",
                cursor: member === userName ? "default" : "pointer",
                fontSize: "14px",
                fontStyle: member === userName ? "italic" : "normal",
                boxShadow: member === userName ? "none" : "0 2px 6px rgba(0,0,0,0.2)",
                transition: "transform 0.1s ease-in-out",
              }}
              onMouseEnter={(e) => {
                if (member !== userName) e.currentTarget.style.transform = "scale(1.03)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              {member === userName ? `${member} (You)` : member}
            </button>
          ))}
        </Stack>

        <div className="mb-2">
          <strong>Select Tags:</strong>
          <div className="d-flex gap-2 flex-wrap justify-content-center mt-2">
            {predefinedTags.map((tag) => (
              <button
                key={tag}
                className={`btn ${tags.includes(tag) ? "btn-success" : "btn-secondary"}`}
                onClick={() => toggleTag(tag)}
              >
                {tags.includes(tag) ? `✔ ${tag}` : tag}
              </button>
            ))}
          </div>
        </div>

        <div className="group-post-btns d-flex justify-content-between">
          <Button
            variant="outlined"
            color="error"
            onClick={() => navigate(-1)}
            sx={{ minWidth: 120 }}
        >
            Cancel
        </Button>
        <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={SaveChanges}
            sx={{ minWidth: 120}}
        >
             Create Group
        </Button>
        </div>
      </div>

      {showDialog && (
        <Modal
          title="Add New Member"
          message="Enter the new member's name:"
          onClose={() => setShowDialog(false)}
          showInput
          inputPlaceholder="Member Name"
          inputValue={newMemberName}
          setInputValue={setNewMemberName}
          actions={
            <>
              <button className="btn btn-secondary" onClick={() => setShowDialog(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleAddMember}>
                Add
              </button>
            </>
          }
        />
      )}

      {messageDialog.open && (
        <Modal
          title="Notice"
          message={messageDialog.message}
          onClose={() => setMessageDialog({ open: false, message: "" })}
          actions={
            <button className="btn btn-primary" onClick={() => setMessageDialog({ open: false, message: "" })}>
              OK
            </button>
          }
        />
      )}
    </div>
  );
};

export default EditGroupPage;
