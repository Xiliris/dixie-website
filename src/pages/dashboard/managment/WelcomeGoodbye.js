import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../../axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../managment/ToastCustomScss.scss";
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

  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => {
    async function getWelcomeGoodbye() {
      try {
        const response = await axios.get(
          `/dashboard/management/welcome-goodbye/${id}`
        );
        if (response.status === 200) {
          const { welcomeMessage, welcomeImage, goodbyeMessage } =
            response.data.dashboard;
          setWelcomeMessage(welcomeMessage);
          setWelcomeImage(welcomeImage);
          setGoodbyeMessage(goodbyeMessage);
          setGuildChannels(response.data.channels);
        }
      } catch (error) {
        navigate("/error/401");
      }
    }

    getWelcomeGoodbye();
  }, [id, navigate]);

  const handleSubmitWelcomeMessage = async (e) => {
    e.preventDefault();

    const welcomeMessageText = welcomeMessage.text.trim();

    if (
      !welcomeMessageText ||
      welcomeMessageText.length < 4 ||
      welcomeMessageText.length > 250
    ) {
      return;
    }

    try {
      const response = await axios.post(
        `/dashboard/management/welcome-goodbye/${id}`,
        {
          welcomeMessage,
          welcomeImage,
          goodbyeMessage,
        }
      );
      setResponseMessage(response.data.message);
      toast.success(response.data.message, {
        className: "custom-toast",
      });
    } catch (error) {
      navigate("/error/401");
      toast.error(error.message, {
        className: "custom-toast-error",
      });
    }
  };

  return (
    <>
      <Navbar navType="nav-dashboard" />
      <Header title="Welcome & Goodbye" />
      <main className="welcome-goodbye">
        <ToastContainer position="bottom-center" />
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
                {guildChannels ? (
                  guildChannels.map((channel) => (
                    <option key={channel.id} value={channel.id}>
                      {channel.name}
                    </option>
                  ))
                ) : (
                  <option>No channels available</option>
                )}
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
