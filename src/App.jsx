import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import HomePage from "./HomePage";
import ProfilePage from "./ProfilePage";
import JoinRequestPage from "./JoinRequestPage";
import GroupInfoPage from "./GroupInfoPage";
import CreateGroupPage from "./CreateGroupPage";
import Footer from "./Footer";

function App() {
  return (
    <Router>
      <Header></Header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/join-request" element={<JoinRequestPage />} />
        <Route path="/group/:groupId" element={<GroupInfoPage />} />
        <Route path="/create" element={<CreateGroupPage />} />
      </Routes>
      <Footer></Footer>
    </Router>
  );
}

export default App;