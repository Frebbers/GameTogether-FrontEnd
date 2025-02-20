const CreateGroupPage = () => {
    return (
      <div className="container">
        <h1>Create a New Group</h1>
        <p>Here you can add a form to create a group</p>
        <button onClick={() => window.history.back()}>Go Back</button>
      </div>
    );
};

export default CreateGroupPage;