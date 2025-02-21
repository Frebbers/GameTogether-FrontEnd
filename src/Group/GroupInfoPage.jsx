import { useParams } from "react-router-dom";

const GroupInfoPage = () => {
    const { groupId } = useParams(); // Get the group ID from the URL

    return (
        <div className="container">
            <h1>Group Info Page</h1>
            <p>Displaying details for group ID: {groupId}</p>
        </div>
    );
};

export default GroupInfoPage;