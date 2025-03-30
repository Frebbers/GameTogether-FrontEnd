import { useState } from "react";
import Header from "./common/Header";
import ControlPanel from "./common/ControlPanal.jsx";
import GroupList from "./groups/GroupList.jsx";
import LoginForm from "./common/LoginForm.jsx";
import RegisterForm from "./common/RegisterForm.jsx";
import './groups/groups.css';

const HomePage = ({ groups }) => {
  const [filterTag, setFilterTag] = useState("All Games");
  const [registered, setRegistered] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  return (
    <div className="container">

      <Header setFilterTag={setFilterTag} />

      {!registered && !token ? (
        <RegisterForm onRegisterSuccess={() => setRegistered(true)} /> 
      ) : !token ? (
        <LoginForm onLoginSuccess={(token) => setToken(token)} />
      ) : (
        <>

      <h1>Available Groups</h1>
      
      <ControlPanel NumberOfGroups={groups.length} filterTag={filterTag} setFilterTag={setFilterTag} />

      {groups.length > 0 ? (
        <GroupList groups={groups} filterTag={filterTag} />
      ) : (
        <p className="no-groups-text">No available groups</p>
      )}
      </>
      )}
    </div>
  );
};

export default HomePage;