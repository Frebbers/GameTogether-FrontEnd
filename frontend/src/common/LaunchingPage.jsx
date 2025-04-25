import { useNavigate } from "react-router-dom";
import logo1 from "../images/logo.png";
import dd from "../images/d&d.png";
import games from "../images/games.png";

const LaunchingPage = () => {
    return (
        <div className="launching-page-container">
            <img src={logo1} alt="Launching Banner" className="launching-logo" />
            
            <div className="game-banners">
                <img src={dd} alt="D&D Banner" className="game-banner" />
                <img src={games} alt="Games Banner" className="game-banner" />
            </div>
        </div>
    );
};

export default LaunchingPage;
