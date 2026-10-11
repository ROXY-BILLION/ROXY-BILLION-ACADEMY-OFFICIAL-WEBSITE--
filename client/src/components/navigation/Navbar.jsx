import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { GraduationCap, Menu, X, ArrowRight } from "lucide-react";
import "./Navbar.css";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Courses", to: "/courses" },
  { label: "Pricing", to: "/pricing" },
  { label: "Contact", to: "/contact" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="academy-navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          <span className="navbar-brand-icon">
            <GraduationCap size={25} />
          </span>
          <span className="navbar-brand-text">
            <strong>ROXY BILLION</strong>
            <small>ACADEMY</small>
          </span>
        </Link>

        <button
          className="navbar-menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>

        <nav className={`navbar-links ${menuOpen ? "is-open" : ""}`}>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              onClick={closeMenu}
              className={({ isActive }) =>
                `navbar-link ${isActive ? "is-active" : ""}`
              }
            >
              {link.label}
            </NavLink>
          ))}

          <Link
            to="/register"
            className="navbar-cta"
            onClick={closeMenu}
          >
            Get Started <ArrowRight size={16} />
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
