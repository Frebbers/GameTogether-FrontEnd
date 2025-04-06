import GroupPost from "./GroupPost.jsx";

const GroupList = ({ groups, filterTag }) => {
  const filteredGroups = filterTag === "All Games" 
    ? groups 
    : groups.filter(group => group.tags.includes(filterTag));

  return (
    <div>
      {filteredGroups.length > 0 ? (
        filteredGroups.map((group, index) => (
          <GroupPost key={index} {...group} />
        ))
      ) : (
        <p className="no-groups-text">No groups found for this category.</p>
      )}
    </div>
  );
};

export default GroupList;
