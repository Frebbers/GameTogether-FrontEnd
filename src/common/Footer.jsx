import { useNavigate } from "react-router-dom";

function Footer(){
    const navigate = useNavigate();

    return(
        <footer className = "footer">
           <nav className="nav-container">
            <ul className = "nav-list-footer">
                <li>
                <a className="nav-element" onClick={() => navigate("/faq")}> 
                        FAQ
                    </a> 
                </li>

                <li>
                    <a className="nav-element" onClick={() => navigate("/about")}>
                        About
                    </a>
                </li>

                <li className="nav-element">
                    &copy; {new Date().getFullYear()} GameTogether
                </li>

                <li>
                    <a className="nav-element" onClick={() => navigate("/support")}>
                        Support
                    </a>
                </li>

                <li>
                    <a className="nav-element" onClick={() => navigate("/policy")}>
                        Private Policy
                    </a>
                </li>
            </ul>
           </nav>
        </footer>
    );

}

export default Footer