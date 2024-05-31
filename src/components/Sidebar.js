import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../axios";
import grayScale from "../imgs/gray-logo.png";
import "./Sidebar.scss";

function Sidebar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [guild, setGuild] = useState({});

  useEffect(() => {
    async function getGuild() {
      const response = await axios
        .get(`/dashboard/server-details/${id}`)
        .catch((err) => {
          navigate("/error/401");
        });
      setGuild(response.data);
    }

    getGuild();
  }, [id, navigate]);

  return (
    <aside className="sidebar">
      <div className="title">
        <img
          src={
            guild.icon
              ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}`
              : grayScale
          }
          alt={guild?.name}
        />
        <h4>{guild?.name}</h4>
      </div>
      <div>
        <h5>General</h5>
        <ul></ul>
      </div>
      <div>
        <h5>Managment</h5>
        <ul>
          <li>
            <Link to={`/dashboard/${id}/chat-management`}>
              <span className="material-symbols-outlined">chat</span>
              Chat Management
            </Link>
          </li>
          <li>
            <Link to={`/dashboard/${id}/administration`}>
              <span className="material-symbols-outlined">
                admin_panel_settings
              </span>
              Administration
            </Link>
          </li>
          <Link to={`/dashboard/${id}/welcome-message`}>
            <li>
              <span class="material-symbols-outlined">waving_hand</span>
              Welcome & Goodbye
            </li>
          </Link>

          <Link to={`/dashboard/${id}/moderation`}>
            <li>
              <span class="material-symbols-outlined">security</span>
              Moderation
            </li>
          </Link>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
