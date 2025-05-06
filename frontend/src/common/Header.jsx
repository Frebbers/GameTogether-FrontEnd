import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

import logo from "../images/sitelogo.png";
import profile from "../images/profileimage.png";

function Header({ setFilterTag }) {
    const navigate = useNavigate();
    const { user } = useUser();

    return (
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-1 px-3">
          <a
            className="navbar-brand d-flex align-items-center"
            role="button"
            onClick={() => {
              navigate("/");
              setFilterTag("All Games");
            }}
          >
            <img src={logo} alt="GameTogether Logo" height="40" />
          </a>
  
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
  
          <div className="collapse navbar-collapse" id="navbarContent">
            <div className="d-flex align-items-center gap-2 ms-auto">
              <button
                className="btn btn-outline-danger"
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.href = "/";
                }}
              >
                Logout
              </button>
  
              <a role="button" onClick={() => navigate("/profile/me")}>
                <img
                  src={user?.profilePicture || profile}
                  alt="Profile"
                  className="rounded-circle"
                  style={{ width: "40px", height: "40px", objectFit: "cover" }}
                />
              </a>
            </div>
          </div>
        </nav>
      </header>
    );
}

export default Header;
