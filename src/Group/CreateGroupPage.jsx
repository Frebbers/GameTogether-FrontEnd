import { useNavigate } from "react-router-dom";

const CreateGroupPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>Create a New Group</h1>
      <p>Here you can add a form to create a group.</p>
      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
};

export default CreateGroupPage;
