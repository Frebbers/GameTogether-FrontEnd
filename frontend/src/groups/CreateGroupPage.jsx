import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createGroup, fetchUserProfile } from "../services/ApiService";

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
    };

    try{
      const group = await createGroup(groupData) // NB: createGroup from apiService, different from CreateGroup from this file
      setGroups((prevGroups) => [...prevGroups, group])
      navigate("/")
    } catch (error) {
      console.error("Error creating group:", error);
      alert("Failed to create group. Please try again")
    }
  };

  return (
    <div className="container">
      <h1>Create A New Group</h1>

      <div className="group-post">
        <div className="group-post-header">
          <input
            type="text"
            className="group-name-input"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Enter Group Name"
          />
          <span className="your-name">{userName}</span>
          <span className="member-count">Members: {members.length}/{maxMembers}</span>
        </div>

        <div className="max-members-section">
          <label>Max Members:</label>
          <input
            type="number"
            className="max-members-input"
            value={maxMembers}
            onChange={(e) => setMaxMembers(Number(e.target.value))}
            min="1"
          />
        </div>

        <textarea
          className="description-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter Group Description"
        ></textarea>

        <button className="add-button" onClick={AddMember}> Add Member </button>

        <ul className="member-list">
          {members.map((member, index) => (
            <li key={index}>{member}</li>
          ))}
        </ul>

        <div className="tags">
          <strong>Select Tags:</strong>
          <div className="tag-options">
            {predefinedTags.map((tag) => (
              <button
                key={tag}
                className={`tag-option ${tags.includes(tag) ? "selected" : ""}`}
                onClick={() => toggleTag(tag)}
              >
                {tags.includes(tag) ? `✔ ${tag}` : tag}
              </button>
            ))}
          </div>
        </div>

        <div className="tags">
          {tags.map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>

        <button className="create-button-2" onClick={CreateGroup}> Create Group </button>
        <button className="cancel-button" onClick={() => navigate(-1)}> Go Back </button>
      </div>
    </div>
  );
};

export default CreateGroupPage;
