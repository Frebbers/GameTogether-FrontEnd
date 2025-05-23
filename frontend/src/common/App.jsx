import { Routes, Route } from "react-router-dom";
import { useState, useContext, useEffect } from "react";

import HomePage from "../HomePage";
import GroupInfoPage from "../groups/GroupInfoPage";
import CreateGroupPage from "../groups/CreateGroupPage";
import EditGroupPage from "../groups/EditGroupPage";
import EditProfilePage from "../profile/EditProfilePage";
import FaqPage from "../common/FaqPage";
import AboutPage from "../common/AboutPage";
import SupportPage from "../common/SupportPage";
import PrivatePolicyPage from "../common/PrivatePolicyPage";
import Layout from "../common/Layout";

import { AuthContext } from "../context/AuthContext";
import { WebSocketEventProvider } from "../context/WebSocketEventContext";
import WebSocketEvents from "../context/WebSocketEvents";
import UserProfilePage from "../profile/ProfilePage";
import NotifySnackBar from "../components/NotifySnackBar";

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
    <WebSocketEventProvider>
      <WebSocketEvents isLoggedIn={isLoggedIn} />
      <NotifySnackBar />
      <Routes>
        <Route
          path="/"
          element={withLayout(HomePage, { groups, setGroups, searchTerm, setSearchTerm }, !isLoggedIn)}
          />
        <Route path="/profile/:userId" element={withLayout(UserProfilePage)} />
        <Route path="/edit-profile" element={withLayout(EditProfilePage)} />
        <Route path="/group/:groupId" element={withLayout(GroupInfoPage, { groups, setGroups })} />
        <Route path="/create-group" element={withLayout(CreateGroupPage, { setGroups })} />
        <Route path="/edit-group/:groupId" element={withLayout(EditGroupPage, { setGroups })} />
        <Route path="/faq" element={withLayout(FaqPage)} />
        <Route path="/about" element={withLayout(AboutPage)} />
        <Route path="/support" element={withLayout(SupportPage)} />
        <Route path="/policy" element={withLayout(PrivatePolicyPage)} />
      </Routes>
    </WebSocketEventProvider>
  );
}

export default App;
