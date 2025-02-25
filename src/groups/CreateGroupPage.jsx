import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateGroupPage = ({ setGroups }) => {
  const navigate = useNavigate();
  const [groupName, setGroupName] = useState("");
  const [maxMembers, setMaxMembers] = useState(10);
  const [members, setMembers] = useState([]);
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);

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

  const AddTag = () => {
    const newTag = prompt("Enter a tag:");
    if (newTag) {
      setTags([...tags, newTag]);
    }
  };

  const CreateGroup = () => {
    if (!groupName.trim()) {
      alert("Group name cannot be empty.");
      return;
    }

    const newGroup = {
      name: groupName,
      owner: "You",
      members: `${members.length}/${maxMembers}`,
      description: description,
      tags: tags,
    };

    setGroups((prevGroups) => [...prevGroups, newGroup]);
    navigate("/");
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
          <span className="your-name">(Your Name)</span>
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

        <button className="add-button" onClick={AddTag}> Add Tag </button>

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
