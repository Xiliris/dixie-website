import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../../axios";

import "./WelcomeGoodbye.scss";

import Navbar from "../../../components/Navbar";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";

function WelcomeGoodbye() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [guildChannels, setGuildChannels] = useState([]);

  const [welcomeMessage, setWelcomeMessage] = useState({
    enabled: false,
    channel: "",
    text: "",
  });

  const [welcomeImage, setWelcomeImage] = useState({
    enabled: false,
    channel: "",
    image: "",
    text: "",
  });

  const [goodbyeMessage, setGoodbyeMessage] = useState({
    enabled: false,
    channel: "",
    text: "",
  });

  useEffect(() => {
    async function getWelcomeGoodbye() {
      const response = await axios
        .get(`/dashboard/managment/welcome-goodbye/${id}`)
        .catch((err) => {
          navigate("/error/401");
        });

      if (response && response.status === 200) {
        const { welcomeMessage, welcomeImage, goodbyeMessage } =
          response.data.dashboard;
        console.log(response.data);

        setWelcomeMessage(welcomeMessage);
        setWelcomeImage(welcomeImage);
        setGoodbyeMessage(goodbyeMessage);
        setGuildChannels(response.data.channels);
      }
    }

    getWelcomeGoodbye();
  }, []);

  const handleSubmitWelcomeMessage = async (e) => {
    e.preventDefault();

    const welcomeMessageText = welcomeMessage.text.trim();

    if (!welcomeMessageText) return;
    if (welcomeMessageText.length < 4) return;
    if (welcomeMessageText.length > 250) return;

    await axios
      .post(`/dashboard/managment/welcome-goodbye/${id}`, {
        welcomeMessage,
        welcomeImage,
        goodbyeMessage,
      })
      .catch((err) => {
        navigate("/error/401");
      });
    console.log("Welcome message successfully saved.");
  };

  return (
    <>
      <Navbar navType="nav-dashboard" />
      <Header title="Welcome & Goodbye" />
      <main className="welcome-goodbye">
        <Sidebar />
        <section className="welcome-goodbye-content">
          <h1 className="title">Welcome & Goodbye</h1>
          <form onSubmit={handleSubmitWelcomeMessage}>
            <article className="welcome-message">
              <input
                type="checkbox"
                checked={welcomeMessage.enabled}
                onChange={(e) =>
                  setWelcomeMessage({
                    ...welcomeMessage,
                    enabled: e.target.checked,
                  })
                }
              />
              <label htmlFor="welcome-message-channels">Welcome message</label>
              <select
                name="welcome-message-channels"
                id="welcome-message-channels"
                value={welcomeMessage.channel}
                onChange={(e) =>
                  setWelcomeMessage({
                    ...welcomeMessage,
                    channel: e.target.value,
                  })
                }
              >
                {guildChannels
                  ? guildChannels.map((channel) => {
                      return (
                        <option key={channel.id} value={channel.id}>
                          {channel.name}
                        </option>
                      );
                    })
                  : "No channels available"}
              </select>
              <label htmlFor="welcome-message-input"></label>
              <textarea
                id="welcome-message-input"
                placeholder="Welcome message"
                defaultValue={welcomeMessage.text}
                onChange={(e) =>
                  setWelcomeMessage({
                    ...welcomeMessage,
                    text: e.target.value,
                  })
                }
              />
              <div>
                <button type="submit">Save</button>
              </div>
            </article>
          </form>
        </section>
      </main>
    </>
  );
}

export default WelcomeGoodbye;
