import ControlPanel from "./ControlPanal.jsx"
import GroupList from "./GroupList.jsx"

const groups = [
  {
    name: "Group 1",
    owner: "User A",
    members: "5/10",
    description: "This is a sample group description.",
    tags: ["Tag1", "Tag2", "Tag3", "Tag4", "Tag5"],
  },
  {
    name: "Group 2",
    owner: "User B",
    members: "3/8",
    description: "Another example of a group.",
    tags: ["TagA", "TagB", "TagC"],
  },
];

const HomePage = ({ openCreatePage }) => {
  return (
    <div className="container">
      <h1>Available Groups</h1>
      <ControlPanel NumberOfGroups={groups.length} />
      <GroupList groups={groups} />
    </div>
  );
};

export default HomePage;