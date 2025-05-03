import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createGroup, fetchUserProfile } from "../services/apiService";
import background from "../images/background.jpg";
import Modal from "../components/Modal";

const predefinedTags = ["D&D", "Other Game"];

const CreateGroupPage = ({ setGroups }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [groupName, setGroupName] = useState("");
  const [maxMembers, setMaxMembers] = useState(10);
  const [members, setMembers] = useState([]);
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [newMemberName, setNewMemberName] = useState("");

  const [isVisible, setIsVisible] = useState(true);
  const [ageFrom, setAgeFrom] = useState(0);
  const [ageTo, setAgeTo] = useState(99);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await fetchUserProfile();
        setUserName(user.username);
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    };
    fetchUser();
  }, []);

  const AddMember = () => {
    if (members.length >= maxMembers) {
      alert("Maximum number of members reached.");
      return;
    }
    setNewMemberName("");
    setShowDialog(true);
  };

  const handleAddMember = () => {
    if (newMemberName.trim()) {
      setMembers((prev) => [...prev, newMemberName.trim()]);
    }
    setShowDialog(false);
  };

  const toggleTag = (tag) => {
    setTags((prevTags) =>
      prevTags.includes(tag) ? prevTags.filter((t) => t !== tag) : [...prevTags, tag]
    );
  };

  const CreateGroup = async () => {
    if (!groupName.trim()) {
      alert("Group name cannot be empty.");
      return;
    }

    if (ageFrom > ageTo) {
      alert("Minimum age cannot be greater than maximum age.");
      return;
    }

    const groupData = {
      title: groupName,
      isVisible: isVisible,
      ageRange: `${ageFrom} - ${ageTo}`,
      maxMembers: maxMembers,
      description: description,
      tags: tags,
      nonUserMembers: members,
    };

    try {
      const group = await createGroup(groupData);
      setGroups((prevGroups) => [...prevGroups, group]);
      navigate("/");
    } catch (error) {
      console.error("Error creating group:", error);
      alert("Failed to create group. Please try again");
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
        paddingTop: "80px",
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
        }}
      >
        <h1 className="text-center mb-4">Create A New Group</h1>

        <div className="group-post-header mb-3 d-flex flex-column align-items-center">
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Enter Group Name"
            style={{
              marginBottom: "10px",
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

        <div className="mb-3 w-100" style={{ textAlign: "left" }}>
          {/* Visibility */}
          <div className="mb-3">
            <label className="form-label">Visibility:</label>
            <select
              className="form-select"
              style={{
                backgroundColor: "#4A4E54",
                color: "white",
                border: "none",
                width: "250px", // fixed width for better alignment
              }}
              value={isVisible}
              onChange={(e) => setIsVisible(e.target.value === "true")}
            >
              <option value="true">Public</option>
              <option value="false">Private</option>
            </select>
          </div>

          {/* Age Range */}
          <div className="mb-3">
            <label className="form-label">Age Range:</label>
            <div className="d-flex align-items-center" style={{ gap: "10px" }}>
              <input
                type="number"
                min="0"
                max="100"
                value={ageFrom}
                onChange={(e) => setAgeFrom(Number(e.target.value))}
                style={{
                  width: "80px",
                  backgroundColor: "#4A4E54",
                  color: "white",
                  padding: "8px",
                  fontSize: "14px",
                  borderRadius: "8px",
                  border: "none",
                  textAlign: "center",
                }}
              />
              to
              <input
                type="number"
                min="0"
                max="100"
                value={ageTo}
                onChange={(e) => setAgeTo(Number(e.target.value))}
                style={{
                  width: "80px",
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

          {/* Max Members */}
          <div className="mb-3">
            <label className="form-label">Max Members:</label>
            <input
              type="number"
              className="form-control"
              value={maxMembers}
              onChange={(e) => setMaxMembers(Number(e.target.value))}
              min="1"
              style={{
                width: "250px",
                backgroundColor: "#4A4E54",
                color: "white",
                padding: "10px",
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

        <button className="btn btn-primary d-block mx-auto mb-3" onClick={AddMember}>
          Add Member
        </button>

        <ul className="list-unstyled text-center mb-3">
          {members.map((member, index) => (
            <li key={index}>{member}</li>
          ))}
        </ul>

        <div className="mb-3">
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

        <div className="group-post-btns">
          <button className="btn btn-primary d-block" onClick={CreateGroup}>
            Create Group
          </button>
          <button className="btn btn-danger d-block" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      </div>

      {/* Modal for adding member */}
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
    </div>
  );
};

export default CreateGroupPage;
