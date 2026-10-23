import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  GraduationCap,
  Menu,
  X,
  ArrowRight,
  LayoutDashboard,
  LogOut,
  UserRound,
  LogIn,
} from "lucide-react";
import { useAuth } from "../../context/authContext";
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
  const { user, isAuthenticated, loading, logout } = useAuth();
  const navigate = useNavigate();

  function closeMenu() {
    setMenuOpen(false);
  }

  async function handleLogout() {
    closeMenu();

    try {
      await logout();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  const displayName =
    user?.name || user?.fullName || user?.email || "My account";

  return (
    <header className="academy-navbar">
      <div className="navbar-container">
        <Link
          to="/"
          className="navbar-brand"
          onClick={closeMenu}
          aria-label="Roxy Billion Academy home"
        >
          <span className="navbar-brand-icon">
            <GraduationCap size={26} />
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
          aria-controls="academy-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>

        <nav
          id="academy-navigation"
          className={`navbar-links ${menuOpen ? "is-open" : ""}`}
          aria-label="Main navigation"
        >
          <div className="navbar-main-links">
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
          </div>

          {!loading && !isAuthenticated && (
            <div className="navbar-account-actions">
              <Link
                to="/login"
                className="navbar-login"
                onClick={closeMenu}
              >
                <LogIn size={16} />
                Log in
              </Link>

              <Link
                to="/register"
                className="navbar-cta"
                onClick={closeMenu}
              >
                Get Started
                <ArrowRight size={16} />
              </Link>
            </div>
          )}

          {!loading && isAuthenticated && (
            <div className="navbar-account-actions navbar-signed-in">
              <Link
                to="/dashboard"
                className="navbar-cta navbar-dashboard"
                onClick={closeMenu}
              >
                <LayoutDashboard size={17} />
                Dashboard
              </Link>

              <div
                className="navbar-user"
                title={displayName}
                aria-label={`Signed in as ${displayName}`}
              >
                <span className="navbar-user-icon">
                  <UserRound size={17} />
                </span>

                <span className="navbar-user-name">
                  {displayName}
                </span>
              </div>

              <button
                type="button"
                className="navbar-logout"
                onClick={handleLogout}
              >
                <LogOut size={16} />
                Log out
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
