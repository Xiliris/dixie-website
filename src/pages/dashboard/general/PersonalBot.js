import "./PersonalBot.scss";
import Navbar from "../../../components/Navbar";
import Header from "../../../components/Header";
import axios from "../../../axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import defaultLogo from "../../../imgs/dixie.svg";

function PersonalBot() {
  const { id } = useParams();
  const [botToken, setBotToken] = useState("");
  const [tokenError, setTokenError] = useState("");
  const [botAppearance, setBotAppearance] = useState({});
  useEffect(() => {
    async function getBotToken() {
      const response = await axios.get(`/dashboard/personal-bot/${id}`);

      if (response.status === 200) {
        setBotToken(response.data.token);
        setBotAppearance(response.data);
      }
    }

    getBotToken();
  }, []);

  const onSubmitLogin = async (e) => {
    e.preventDefault();
    const token = e.target.elements[0].value;

    if (token.length < 59) {
      setTokenError("(Invalid token)");
      return;
    }

    const response = await axios.post(`/client/login`, {
      token,
      guildId: id,
    });

    if (response.status === 200) {
      setBotToken(token);
    }
  };

  const onSubmitPreview = async (e) => {
    const form = e.target;
    const nameInput = form.elements[0];
    const statusInput = form.elements[1];
    const descriptionInput = form.elements[2];

    nameInput.style.border = "1px solid #0f060f";
    statusInput.style.border = "1px solid #0f060f";
    descriptionInput.style.border = "1px solid #0f060f";

    const validateFields = () => {
      e.preventDefault();
      let isValid = true;

      if (!nameInput.value.trim()) {
        nameInput.style.border = "1px solid red";
        isValid = false;
      }

      if (!statusInput.value.trim()) {
        statusInput.style.border = "1px solid red";
        isValid = false;
      }

      if (!descriptionInput.value.trim()) {
        descriptionInput.style.border = "1px solid red";
        isValid = false;
      }

      return isValid;
    };

    if (validateFields()) {
      const response = await axios.post(`/client/apperence`, {
        name: nameInput.value,
        status: statusInput.value,
        description: descriptionInput.value,
        guildId: id,
      });

      console.log(response.data);
    }
  };

  return (
    <>
      <Navbar />
      <Header title="Personal Bot" />
      <main className="personal-bot">
        <h1>PERSONAL BOT</h1>
        <section className="bot-preview">
          <h2>Bot Preview</h2>
          <form onSubmit={onSubmitPreview}>
            <div>
              <img src={defaultLogo} alt="Bot avatar" />
              <div className="title-container">
                <input
                  type="text"
                  placeholder="Enter bot name"
                  defaultValue={botAppearance.name}
                />
                <input
                  type="text"
                  placeholder="Status"
                  defaultValue={botAppearance.status}
                />
              </div>
            </div>
            <textarea
              placeholder="Enter bot description"
              defaultValue={botAppearance.description}
            />
            <button type="submit">Save</button>
          </form>
        </section>

        <section className="bot-login">
          <h2>Bot Login</h2>
          <form onSubmit={onSubmitLogin}>
            <label>
              Token <span>{tokenError}</span>
            </label>
            <input
              type="password"
              placeholder="Enter bot token"
              defaultValue={botToken}
              onChange={() => {
                setTokenError("");
              }}
            />
            <button type="submit">Save</button>
          </form>
        </section>

        <section className="how-to">
          <h2>How to get bot token?</h2>
          <article>
            <div>
              <p>
                1. Go to{" "}
                <a
                  href="https://discord.com/developers/applications"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Discord Developer Portal
                </a>
                .
              </p>
              <p>2. Click on "New Application".</p>
              <p>3. Go to "Bot" section.</p>
              <p>4. Click on "Add Bot".</p>
              <p>5. Click on "Copy" to copy the token.</p>
            </div>

            <div>
              <h4>IMPORTANT TO ENABLE</h4>
              <p>1. Requires ouath2 code grant</p>
              <p>2. Presence Intent</p>
              <p>3. Server Members Intent</p>
              <p>4. Message Content Intent</p>
            </div>
          </article>
        </section>
      </main>
    </>
  );
}

export default PersonalBot;
