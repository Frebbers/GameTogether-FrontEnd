import { useNavigate } from "react-router-dom";
import logo from "../images/sitelogo.png";
import profile from "../images/profileimage.png";

function Header() {
    const navigate = useNavigate();

    return (
        <header className="header">
            <nav className="nav-container">
                <ul className="nav-list-header">

                    <li className="logo-container"> 
                        <a className="nav-element" onClick={() => navigate("/")}> 
                            <img src={logo} alt="GameTogether Logo" className="logo" /> 
                        </a> 
                    </li>

                    <li>
                        <a className="nav-element">
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
                        <a className="nav-element">
                            Other Games
                        </a>
                    </li>
                    
                    <li className="profile-container"> 
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
