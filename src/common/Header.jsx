import { useNavigate } from "react-router-dom";
import logo from "../images/sitelogo.png";
import profile from "../images/profileimage.png";

function Header() {
    const navigate = useNavigate();

    return (
        <header className="header">
            <nav>
                <ul className="nav-list-header">
                    <li> <a className="nav-element" onClick={() => navigate("/")}> <img src={logo} alt="GameTogether Logo" /> </a> </li>
                    <li> <a className="nav-element" onClick={() => navigate("/profile")}> <img src={profile} alt="Profile Image" /> </a> </li>
                </ul>
            </nav>
            <hr />
        </header>
    );
}

export default Header;