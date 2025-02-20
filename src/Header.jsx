import { useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();

    return (
        <header className="header">
            <nav>
                <ul className="nav-list">
                    <li><button className="nav-element" onClick={() => navigate("/")}>GameTogether</button></li>
                    <li><button className="nav-element" onClick={() => navigate("/profile")}>Profile</button></li>
                </ul>
            </nav>
            <hr />
        </header>
    );
}

export default Header;