import React from "react";
import Navbar from "../components/Navbar";
import Partners from "../components/Partners";
import Features from "../components/Features";
import config from "../config.json";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";


import Dixiebot from "../imgs/dixiebot.svg";

import "./Home.scss";

library.add(faDiscord);

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
            <button className="btn-invite" onClick={() => window.open(config.invite_url)}>
              <FontAwesomeIcon icon={faDiscord} />Add to Discord
            </button>
            <Link to="/#features">
              <button className="features-btn">Features</button>
            </Link>
          </div>
        </section>
        <Partners />
        <Features />
      </main >

    </>
  );
}

export default Home;
