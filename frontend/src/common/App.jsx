import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "../common/Header";
import HomePage from "../HomePage";
import ProfilePage from "../profile/ProfilePage";
import GroupInfoPage from "../groups/GroupInfoPage";
import CreateGroupPage from "../groups/CreateGroupPage";
import Footer from "../common/Footer";
import FaqPage from "../common/FaqPage";
import AboutPage from "../common/AboutPage";
import SupportPage from "../common/SupportPage";
import PrivatePolicyPage from "../common/PrivatePolicyPage";
import RequestJoinDialog from "./RequestJoinDialog";

function App() {
  const [groups, setGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage groups={groups} setGroups={setGroups} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/edit-profile" element={<EditProfilePage />} />
        <Route path="/join-request" element={<RequestJoinDialog />} />
        <Route path="/group/:groupId" element={<GroupInfoPage groups={groups} setGroups={setGroups} />} />
        <Route path="/create" element={<CreateGroupPage setGroups={setGroups} />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/policy" element={<PrivatePolicyPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
