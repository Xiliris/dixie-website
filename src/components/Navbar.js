import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import logo from "../imgs/dixie.svg";
import config from "../config.json";
import axios from "../axios";

import "./Navbar.scss";
import "./Profile.scss";

function Navbar() {
  const [menuState, setMenuState] = useState("menu");
  const [user, setUser] = useState(null);
  const cookies = new Cookies(null, { path: "/" });

  useEffect(() => {
    const token = cookies.get("token");
    if (token) {
      async function getUser() {
        const { data } = await axios.get(`/auth/login/${token}`);
        if (data) {
          await cookies.set("token", data.token, { path: "/" });
          setUser(data.user);
        }
      }
      getUser();
    }
  }, []);

  function toggleMenu() {
    const menu = document.getElementById("menu-items");

    if (menu.style.display === "flex") {
      menu.style.display = "none";
      setMenuState("menu");
      return;
    } else {
      menu.style.display = "flex";
      setMenuState("close");
      return;
    }
  }

  return (
    <nav>
      <Link to="/">
        <img src={logo} alt="Dixie bot" className="logo" />
      </Link>
      <ul id="menu-items">
        <Link to={config.support_url}>
          <li>Support</li>
        </Link>
        <Link to="/#about">
          <li>About</li>
        </Link>
        <Link to="/#features">
          <li>Features</li>
        </Link>
        <Link to="/premium">
          <li className="emphasis">
            <span className="material-symbols-outlined">workspace_premium</span>
            Premium
          </li>
        </Link>
      </ul>

      <span className="material-symbols-outlined category" onClick={toggleMenu}>
        {menuState}
      </span>

      {user ? (
        <UserComponent id={user.id} avatar={user.avatar} />
      ) : (
        <Link to={config.redirect_url}>
          <p>Login</p>
        </Link>
      )}
    </nav>
  );
}

function UserComponent({ id, avatar }) {
  const [menuState, setMenuState] = useState("hidden");
  const [arrowState, setArrowState] = useState("rotateX(0deg)");
  function toggleProfileMenu() {
    if (menuState === "hidden") {
      setMenuState("active");
      setArrowState("rotateX(180deg)");
    } else {
      setMenuState("hidden");
      setArrowState("rotateX(0deg)");
    }
  }

  return (
    <div className="profile">
      <div id="profile-menu" onClick={toggleProfileMenu}>
        <img
          src={`https://cdn.discordapp.com/avatars/${id}/${avatar}`}
          alt="User avatar"
        />
        <span
          className="material-symbols-outlined"
          style={{ transform: arrowState }}
        >
          expand_more
        </span>
      </div>

      <ul className={menuState}>
        <Link to="/profile">
          <li>
            <span className="material-symbols-outlined">person</span>
            Profile
          </li>
        </Link>
        <Link to="/dashboard">
          <li>
            <span className="material-symbols-outlined">dashboard</span>
            Dashboard
          </li>
        </Link>
        <Link to={config.support_url}>
          <li>
            <span className="material-symbols-outlined">handshake</span>
            Support
          </li>
        </Link>
        <Link to="/#about">
          <li>
            <span className="material-symbols-outlined">description</span>
            About
          </li>
        </Link>
        <hr />
        <Link to="/premium">
          <li className="emphasis">
            <span className="material-symbols-outlined">workspace_premium</span>
            Premium
          </li>
        </Link>
        <Link to="/#features">
          <li>
            <span className="material-symbols-outlined">star</span>
            Features
          </li>
        </Link>
        <Link to="/dashboard">
          <li>
            <span className="material-symbols-outlined">terminal</span>
            Custom Bot
          </li>
        </Link>
        <hr />
        <Link to="/logout">
          <li className="danger">
            <span className="material-symbols-outlined">logout</span>
            Logout
          </li>
        </Link>
      </ul>
    </div>
  );
}

export default Navbar;
