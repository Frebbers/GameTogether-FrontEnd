import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const GroupInfoPage = () => {
    const { groupId } = useParams();
    const navigate = useNavigate();

    return (
        <div className="container">
            <h1>Group {groupId} Details</h1>

            

        </div>
    );
};

export default GroupInfoPage;