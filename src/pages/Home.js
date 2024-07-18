import React from "react";
import Navbar from "../components/Navbar";
import config from "../config.json";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Dixiebot from "../imgs/dixiebot.svg";

import "./Home.scss";


function Home() {
  return (
    <>
      <Navbar />
      <main id="home">
        <h1>
          Hello! My name is Dixie.
        </h1>
        <p>
          I am the ultimate multitasking,
          budget-friendly, custom Discord bot
          designed to fulfill all your needs.
        </p>
        <section className="main-content">
          <img src={Dixiebot} alt="Dixiebot" className="dixiebot-img" />
          <div className="main-content-buttons">
            <button
              className="btn-invite"
              onClick={() => {
                window.open(config.invite_url);
              }}
            >
              <i className="fa-brands fa-discord"></i>Add to Discord
            </button>
            <Link to="/#features">
              <button>Features</button>
            </Link>
          </div>
        </section>
      </main >
    </>
  );
}

export default Home;
