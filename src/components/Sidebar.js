import { Link, useParams } from "react-router-dom";
import "./Sidebar.scss";

function Sidebar() {
  const { id } = useParams();
  return (
    <aside className="sidebar">
      <h5>General</h5>
      <ul>
        <Link to={`/dashboard/${id}/personal-bot`}>
          <li>Personal BOT</li>
        </Link>
      </ul>
      <h5>Managment</h5>
      <ul>
        <Link to={`/dashboard/${id}/chat-managment`}>
          <li>Chat Managment</li>
        </Link>
      </ul>
    </aside>
  );
}

export default Sidebar;
