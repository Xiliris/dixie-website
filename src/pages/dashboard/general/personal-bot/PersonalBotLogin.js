import "./PersonalBotLogin.scss";
import Navbar from "../../../../components/Navbar";
import Header from "../../../../components/Header";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "../../../../axios";

function PersonalBotLogin() {
  const { id } = useParams();
  const [tokenError, setTokenError] = useState("");

  const onSubmitLogin = async (e) => {
    e.preventDefault();
    const token = e.target.elements[0].value;

    if (token.length < 59) {
      setTokenError("(Invalid token)");
      return;
    }

    const response = await axios
      .post(`/client/login`, {
        token,
        guildId: id,
      })
      .catch((err) => {
        setTokenError("(Invalid token)");
      });

    if (response && response.status === 200) {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  return (
    <>
      <Navbar />
      <Header title="Personal Bot Login" />
      <main className="personal-bot-login">
        <section className="bot-login">
          <h2>Bot Login</h2>
          <form onSubmit={onSubmitLogin}>
            <label>
              Token <span>{tokenError}</span>
            </label>
            <input
              type="password"
              placeholder="Enter bot token"
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
              <p>1. Presence Intent</p>
              <p>2. Server Members Intent</p>
              <p>3. Message Content Intent</p>
            </div>
          </article>
        </section>
      </main>
    </>
  );
}

export default PersonalBotLogin;
