import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-dark text-light py-3 mt-auto">
      <div className="container">
        <nav className="d-flex flex-column flex-md-row justify-content-evenly align-items-center gap-3">
          <a className="text-light text-decoration-none" role="button" onClick={() => navigate("/faq")}>
            FAQ
          </a>
          <a className="text-light text-decoration-none" role="button" onClick={() => navigate("/about")}>
            About
          </a>
          <span className="text-muted">&copy; {new Date().getFullYear()} GameTogether</span>
          <a className="text-light text-decoration-none" role="button" onClick={() => navigate("/support")}>
            Support
          </a>
          <a className="text-light text-decoration-none" role="button" onClick={() => navigate("/policy")}>
            Privacy Policy
          </a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
