import { useState, useContext } from "react";
import Header from "./common/Header";
import ControlPanel from "./common/ControlPanel.jsx";
import GroupList from "./groups/GroupList.jsx";
import LoginForm from "./common/LoginForm.jsx";
import RegisterForm from "./common/RegisterForm.jsx";
import './groups/groups.css';
import { AuthContext } from "./context/AuthContext";

const HomePage = ({ searchTerm, setSearchTerm }) => {
  const [filterTag, setFilterTag] = useState("All Games");
  const [showRegister, setShowRegister] = useState(false);
  const [groupCount, setGroupCount] = useState(0);

  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div className="container">
      <Header setFilterTag={setFilterTag} setSearchTerm={setSearchTerm} searchTerm={searchTerm} />

      {!isLoggedIn ? (
        <>
          {showRegister ? (
            <>
              <RegisterForm onRegisterSuccess={() => setShowRegister(false)} />
              <p>
                Already have an account?{" "}
                <button onClick={() => setShowRegister(false)}>Log In</button>
              </p>
            </>
          ) : (
            <>
              <LoginForm />
              <p>
                Don't have an account?{" "}
                <button onClick={() => setShowRegister(true)}>Register</button>
              </p>
            </>
          )}
        </>
      ) : (
        <>
          <h1>Available Groups</h1>

          <ControlPanel
            NumberOfGroups={groupCount}
            filterTag={filterTag}
            setFilterTag={setFilterTag}
          />

          <GroupList
            filterTag={filterTag}
            onGroupCountChange={setGroupCount}
            searchTerm={searchTerm}
          />
        </>
      )}
    </div>
  );
};

export default HomePage;
