import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import config from "../../config.json";
import userGuilds from "../../modules/userGuilds";
import itemAnimation from "../../animations/itemAnimation";

import Navbar from "../../components/Navbar";
import Header from "../../components/Header";

import "./Servers.scss";

function Servers() {
  const [servers, setServers] = useState([]);
  const [serverStatus, setServerStatus] = useState("none");
  useEffect(() => {
    async function getServers() {
      const data = await userGuilds();
      if (data) setServers(data);
      else setServerStatus("flex");
    }

    getServers();
  }, []);

  return (
    <>
      <Navbar />
      <Header title="Servers" />
      <div id="servers">
        <h1>Select a server</h1>
        <p style={{ display: serverStatus }}>
          You're unable to make any changes to guilds, Please grant or obtain
          administrator permissions.
        </p>
        <section>
          {servers.length === 0
            ? ""
            : servers.map((server, index) => {
                return (
                  <ServerItem server={server} key={server.id} index={index} />
                );
              })}
        </section>
      </div>
    </>
  );
}

function ServerItem({ server, index }) {
  return (
    <motion.article
      variants={itemAnimation}
      initial="initial"
      whileInView="animate"
      custom={{ index: index, time: 0.2 }}
      viewport={{ once: true, amount: 0.5 }}
    >
      <div>
        <img
          src={`https://cdn.discordapp.com/icons/${server.id}/${server.icon}`}
          alt={server.name}
        />
        <h3>{server.name}</h3>
      </div>

      <Link to={`/dashboard/${server.id}`}>
        <button className="btn-emphasis">Manage</button>
      </Link>
    </motion.article>
  );
}

export default Servers;
