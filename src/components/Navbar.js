import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../imgs/dixie.svg";
import config from "../config.json";
import getUserData from "../modules/userData";

import "./Navbar.scss";

function Navbar({ navType }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUser() {
      const user = await getUserData();

      if (user) {
        console.log(user);
        setUser(user);
      }
    }
    getUser();
  }, []);

  return (
    <nav className={navType}>
      <Link to="/">
        <img src={logo} alt="Dixie bot" className="logo" />
      </Link>

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
        <span
          className="material-symbols-outlined"
          style={{ transform: arrowState }}
        >
          expand_more
        </span>
        <img
          src={`https://cdn.discordapp.com/avatars/${id}/${avatar}.webp?size=512`}
          alt="User avatar"
        />
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
            Pricing
          </li>
        </Link>
        <Link to="/#features">
          <li>
            <span className="material-symbols-outlined">star</span>
            Features
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
