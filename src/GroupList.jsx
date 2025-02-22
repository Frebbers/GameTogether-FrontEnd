import GroupPost from "./GroupPost.jsx";

const GroupList = ({ groups }) => {
  return (
    <div>
      {groups.map((group, index) => (
        <GroupPost key={index} {...group} />
      ))}
    </div>
  );
};

export default GroupList;
