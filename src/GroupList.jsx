import GroupPost from "./GroupPost.jsx"

const GroupList = () => {
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

  return (
    <div>
      {groups.map((group, index) => (
        <GroupPost key={index} {...group} />
      ))}
    </div>
  );
};

export default GroupList;