import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useContext } from "react";

import HomePage from "../HomePage";
import ProfilePage from "../profile/ProfilePage";
import GroupInfoPage from "../groups/GroupInfoPage";
import CreateGroupPage from "../groups/CreateGroupPage";
import EditProfilePage from "../profile/EditProfilePage";
import FaqPage from "../common/FaqPage";
import AboutPage from "../common/AboutPage";
import SupportPage from "../common/SupportPage";
import PrivatePolicyPage from "../common/PrivatePolicyPage";
import Layout from "../common/Layout";

import { AuthContext } from "../context/AuthContext";

function App() {
  const { isLoggedIn } = useContext(AuthContext);
  const [groups, setGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const withLayout = (Component, props = {}, hideHeader = false) => (
    <Layout hideHeader={hideHeader}>
      <Component {...props} />
    </Layout>
  );

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={withLayout(HomePage, { groups, setGroups, searchTerm, setSearchTerm }, !isLoggedIn)}
        />
        <Route path="/profile/:userId" element={withLayout(ProfilePage)} />
        <Route path="/edit-profile" element={withLayout(EditProfilePage)} />
        <Route path="/group/:groupId/:ownerId" element={withLayout(GroupInfoPage, { groups, setGroups })} />
        <Route path="/create" element={withLayout(CreateGroupPage, { setGroups })} />
        <Route path="/faq" element={withLayout(FaqPage)} />
        <Route path="/about" element={withLayout(AboutPage)} />
        <Route path="/support" element={withLayout(SupportPage)} />
        <Route path="/policy" element={withLayout(PrivatePolicyPage)} />
      </Routes>
    </Router>
  );
}

export default App;
