import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../imgs/dixie.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import config from "../config.json";
import getUserData from "../modules/userData";
import "./Navbar.scss";

const Navbar = () => {
  const [userData, setUserData] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    getUserData().then((data) => {
      setUserData(data);
    });
  }, []);

  return (
    <section className="navbar">
      <div className="navbar-container">
        <Link to="/">
          <img className="navbar-logo" src={logo} alt="Dixie logo" />
        </Link>
        <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <div className={`navbar-links ${isMenuOpen ? "open" : ""}`}>
          <Link to="/" className="navbar-link">Home</Link>
          <Link to="/about-us" className="navbar-link">About us</Link>
          <Link to="/features" className="navbar-link">Features</Link>
          <Link to="/pricing" className="navbar-link">Pricing</Link>
          <Link to="/contact" className="navbar-link">Contact</Link>
          {userData ? (
            <div className="user-data">
              <Link to="/profile" className="navbar-link">{userData.global_name} profile page</Link>
              <Link to="/logout" className="logout-btn">Logout</Link>
            </div>
          ) : (
            <Link to="/login" className="login-btn">Login</Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default Navbar;
