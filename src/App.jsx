import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./Header";
import HomePage from "./HomePage";
import ProfilePage from "./ProfilePage";
import JoinRequestPage from "./JoinRequestPage";
import GroupInfoPage from "./GroupInfoPage";
import CreateGroupPage from "./CreateGroupPage";
import Footer from "./Footer";

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
