import react from "react";
import { Link } from "react-router-dom";

import Logo from "../imgs/dixie.svg";

import "./Footer.scss";

function Footer() {
  return (
    <footer>
      <h3>Useful links</h3>
      <div className="footer-content">
        <Link to="/">
          <img src={Logo} alt="Dixiebot" className="footer-logo" />
        </Link>
        <div className="footer-links">

          <div className="footer-left">
            <Link to="/about-us" className="footer-link">About us</Link>
            <Link to="/features" className="footer-link">Features</Link>
            <Link to="/pricing" className="footer-link">Pricing</Link>
            <Link to="/contact" className="footer-link">Contact</Link>
          </div>
          <div className="footer-right">
            <Link to="/profile" className="footer-link">Profile</Link>
            <Link to="/dashboard" className="footer-link">Dashboard</Link>
            <Link to="/login" className="footer-link">Sign in</Link>
            <Link to="/register" className="footer-link">Sign up</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2022 Dixiebot. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
