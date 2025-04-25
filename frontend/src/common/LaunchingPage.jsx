import { useNavigate } from "react-router-dom";
import logo1 from "../images/logo.png";
import dd from "../images/d&d.png";
import games from "../images/games.png";
import background from "../images/background.png";

const LaunchingPage = (setFilterTag) => {
    const navigate = useNavigate();
    return (
        <div
        className="container"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <img src={logo1} alt="Launching Banner" className="launching-logo" />
        <div className="launching-page-text">
        <p>Your go-to place to find the best teammates to fit your needs and have a memorable time with.</p>
        </div>
        <hr></hr>
        <div className="game-banners">
          <img src={dd} alt="D&D Banner" className="game-banner" onClick={() => setFilterTag("D&D")} />
          <img src={games} alt="Games Banner" className="game-banner" onClick={() => setFilterTag("Other Game")} />
        </div>
      </div>
      
    );
};

export default LaunchingPage;
