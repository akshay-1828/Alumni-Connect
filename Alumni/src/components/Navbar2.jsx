import "./../styles/navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      
      {/* Logo */}
      <div className="nav-logo">
        Alumni <span className="logo-accent">Connect</span>
      </div>

      {/* Navigation Links */}
      <ul className="nav-links">
        <li className="nav-item">
          <Link to="/dashboard" className="nav-link-item">
            Home
            <span className="nav-link-underline"></span>
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/mentors" className="nav-link-item">
            Mentors
            <span className="nav-link-underline"></span>
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/mentorship" className="nav-link-item">
            Mentorship
            <span className="nav-link-underline"></span>
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/internships" className="nav-link-item">
            Internships
            <span className="nav-link-underline"></span>
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/applications" className="nav-link-item">
            Applications
            <span className="nav-link-underline"></span>
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/messages" className="nav-link-item">
            Messages
            <span className="nav-link-underline"></span>
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/profile" className="nav-link-item">
            Profile
            <span className="nav-link-underline"></span>
          </Link>
        </li>
      </ul>

      {/* Logout */}
      <button className="logout-btn" onClick={() => (window.location = "/")}>
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
