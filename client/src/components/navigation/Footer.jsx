import { Link } from "react-router-dom";
import { GraduationCap, Mail, ArrowUpRight } from "lucide-react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="academy-footer">
      <div className="footer-main">
        <div className="footer-brand-column">
          <Link to="/" className="footer-brand">
            <GraduationCap size={27} />
            <span>Roxy Billion Academy</span>
          </Link>

          <p>
            A place to discover knowledge, develop valuable skills,
            and pursue your potential across a world of subjects.
          </p>

          <a className="footer-contact-link" href="mailto:hello@roxybillionacademy.com">
            <Mail size={16} />
            Contact the academy
            <ArrowUpRight size={15} />
          </a>
        </div>

        <div className="footer-link-column">
          <h3>Explore</h3>
          <Link to="/courses">Courses</Link>
          <Link to="/about">About us</Link>
          <Link to="/pricing">Learning plans</Link>
        </div>

        <div className="footer-link-column">
          <h3>Get started</h3>
          <Link to="/register">Create an account</Link>
          <Link to="/login">Sign in</Link>
          <Link to="/contact">Contact us</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Roxy Billion Academy.</p>
        <p>Learn. Discover. Grow.</p>
      </div>
    </footer>
  );
}

export default Footer;
