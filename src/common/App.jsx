import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "../common/Header";
import HomePage from "../HomePage";
import ProfilePage from "../profile/ProfilePage";
import JoinRequestPage from "./JoinRequestPage";
import GroupInfoPage from "../groups/GroupInfoPage";
import CreateGroupPage from "../groups/CreateGroupPage";
import Footer from "../common/Footer";

function App() {
  const [groups, setGroups] = useState([]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage groups={groups} />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/join-request" element={<JoinRequestPage />} />
        <Route path="/group/:groupId" element={<GroupInfoPage />} />
        <Route path="/create" element={<CreateGroupPage setGroups={setGroups} />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
