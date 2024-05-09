import "./Home.scss";
import Navbar from "../components/Navbar";
import config from "../config.json";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <Navbar />
      <main id="home">
        <h1>
          Hello! <br></br>My name is Dixie.
        </h1>
        <p>
          I am the ultimate multitasking,<br></br>
          budget-friendly, custom Discord bot<br></br>
          designed to fulfill all your needs.
        </p>
        <div>
          <button
            className="btn-emphasis"
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
      </main>
    </>
  );
}

export default Home;
