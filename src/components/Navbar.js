import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../imgs/dixie.svg";
import config from "../config.json";
import getUserData from "../modules/userData";

import "./Navbar.scss";

const Navbar = () => {
  const [userData, setUserData] = useState(null);

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
        <div className="navbar-links">
          <Link to="/about" className="navbar-link">
            Home
          </Link>
          <Link to="/contact" className="navbar-link">
            About us
          </Link>
          <Link to="/profile" className="navbar-link">
            Features
          </Link>
          <Link to="/pricing" className="navbar-link">
            Pricing
          </Link>
          <Link to="/contact" className="navbar-link">
            Contact
          </Link>
          {userData ? (
            <Link to="/profile" className="navbar-link">
              {userData.name}
            </Link>
          ) : (
            <Link to="/login" className="login-btn">
              Login
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default Navbar;
