import { useNavigate } from "react-router-dom";
import logo from "../images/sitelogo.png";
import profile from "../images/profileimage.png";

function Header({setFilterTag}) {
    const navigate = useNavigate();

    return (
        <header className="header">
            <nav className="nav-container">
                <ul className="nav-list-header">

                    <li className="logo-container"> 
                        <a className="nav-element" onClick={() => {
                            navigate("/");
                            setFilterTag("All Games");
                        }}
                            > 
                            <img src={logo} alt="GameTogether Logo" className="logo" /> 
                        </a> 
                    </li>

                    <li>
                        <a className="nav-element" onClick={() => setFilterTag("D&D")}>
                            D&D
                        </a>
                    </li>

                    <li className="search-container">
                        <input 
                            type="text" 
                            placeholder="Search for groups..." 
                            className="search-bar"
                        />
                    </li>

                    <li>
                        <a className="nav-element" onClick={() => setFilterTag("Other Game")}>
                            Other Games
                        </a>
                    </li>
                    
                    <li className="profile-container"> 
                        <button
                            onClick={() => {
                                localStorage.removeItem("token");
                            }}
                            className="profile-button"
                        >
                            Logout
                        </button>

                        <a className="nav-element" onClick={() => navigate("/profile")}> 
                            <img src={profile} alt="Profile Image" className="profile-icon" /> 
                        </a> 
                    </li>

                </ul>
            </nav>
        </header>
    );
}

export default Header;