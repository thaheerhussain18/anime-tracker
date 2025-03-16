import { Link } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo">Anime Tracker</div>

      {/* Mobile Menu Button */}
      <button className="menu-btn" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>

      <ul className={isOpen ? "nav-links open" : "nav-links"}>
        <li>
          <Link to="/watched">Watched</Link>
        </li>
        <li>
          <Link to="/saved">Saved</Link>
        </li>
        <li>
          <Link to="/">Add Anime</Link>
        </li>
      </ul>
    </nav>
  );
}
