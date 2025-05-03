import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createGroup, fetchUserProfile } from "../services/apiService";
import background from "../images/background.jpg"; // <-- Add this if you have a background image

const predefinedTags = ["D&D", "Other Game"];

const CreateGroupPage = ({ setGroups }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [groupName, setGroupName] = useState("");
  const [maxMembers, setMaxMembers] = useState(10);
  const [members, setMembers] = useState([]);
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);

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
    if (members.length < maxMembers) {
      const newMember = prompt("Enter member name:");
      if (newMember) {
        setMembers([...members, newMember]);
      }
    } else {
      alert("Maximum number of members reached.");
    }
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

    const groupData = {
      title: groupName,
      isVisible: true,
      ageRange: "0 - 99",
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
          className="form-control mb-2"
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
            <span className="your-name">{userName}</span>
            <span className="member-count">
              Members: {members.length}/{maxMembers}
            </span>
          </div>
        </div>

        <div className="max-members-section mb-3 d-flex align-items-center">
          <label className="me-2">Max Members:</label>
          <input
            type="number"
            className="form-control"
            value={maxMembers}
            onChange={(e) => setMaxMembers(Number(e.target.value))}
            min="1"
            style={{
              width: "80px",
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

        <textarea
          className="form-control mb-3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter Group Description"
          style={{
            marginBottom: "10px",
            padding: "10px",
            fontSize: "14px",
            borderRadius: "8px",
            minHeight: "150px",
            resize: "none",
          }}
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

        <button className="btn btn-primary d-block mx-auto mb-2" onClick={CreateGroup}>
          Create Group
        </button>
        <button className="btn btn-danger d-block mx-auto" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default CreateGroupPage;
