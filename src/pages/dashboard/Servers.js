import Cookies from "universal-cookie";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import config from "../../config.json";
import userGuilds from "../../modules/userGuilds";

require("./Servers.scss");

function Servers() {
  const [servers, setServers] = useState([]);
  useEffect(() => {
    async function getServers() {
      const data = await userGuilds();
      if (data) setServers(data);
    }

    getServers();
  }, []);

  return (
    <>
      <Navbar />
      <div id="servers">
        <h1>Please select a server</h1>
        <p style={{ display: servers.length ? "none" : "flex" }}>
          You're unable to make any changes to guilds, Please grant or obtain
          administrator permissions.
        </p>
        <section>
          {servers.length === 0
            ? ""
            : servers.map((server) => {
                return <ServerItem server={server} key={server.id} />;
              })}
        </section>
      </div>
    </>
  );
}

function ServerItem({ server }) {
  return (
    <article>
      <img
        src={`https://cdn.discordapp.com/icons/${server.id}/${server.icon}`}
        alt={server.name}
      />
      <h3>{server.name}</h3>

      {server.joined ? (
        <Link to={`/dashboard/${server.id}`}>
          <button className="btn-emphasis">Manage</button>
        </Link>
      ) : (
        <button
          onClick={() => {
            window.open(config.invite_url);
          }}
        >
          Invite
        </button>
      )}
    </article>
  );
}

export default Servers;
