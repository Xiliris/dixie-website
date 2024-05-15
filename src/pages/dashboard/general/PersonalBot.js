import "./PersonalBot.scss";
import Navbar from "../../../components/Navbar";
import Header from "../../../components/Header";
import axios from "../../../axios";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import defaultLogo from "../../../imgs/dixie.svg";
import config from "../../../config";

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
  }, [id]);

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

  function changeImage(e) {
    const fileInput = document.querySelector("input[type=file]");
    const img = e.target;

    fileInput.click();

    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        img.src = e.target.result;
      };

      reader.readAsDataURL(file);
    };
  }

  const onSubmitPreview = async (e) => {
    const form = e.target;

    const fileInput = form.elements[0];
    const nameInput = form.elements[1];
    const statusInput = form.elements[2];
    const descriptionInput = form.elements[3];

    nameInput.style.border = "1px solid #0f060f";
    statusInput.style.border = "1px solid #0f060f";
    descriptionInput.style.border = "1px solid #0f060f";

    const validateFields = () => {
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
      const formData = new FormData();

      if (fileInput.files[0]) {
        formData.append("avatar", fileInput.files[0]);
      }

      formData.append("name", nameInput.value);
      formData.append("status", statusInput.value);
      formData.append("description", descriptionInput.value);
      formData.append("guildId", id);

      await axios.post(`/client/apperence/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }
  };

  return (
    <>
      <Navbar />
      <Header title="Personal Bot" />
      <main className="personal-bot">
        <div className="title">
          <h1>PERSONAL BOT</h1>
          <Link to={`/dashboard/${id}`}>
            <span className="material-symbols-outlined">arrow_back_ios</span>
          </Link>
        </div>
        <section className="bot-preview">
          <h2>Bot Preview</h2>
          <form onSubmit={onSubmitPreview}>
            <div>
              <img
                src={
                  botAppearance
                    ? `${config.baseUrl}/avatars/${botAppearance.avatar}`
                    : defaultLogo
                }
                alt="Bot avatar"
                onClick={(e) => {
                  changeImage(e);
                }}
              />
              <input type="file" accept="image/*" name="avatar" />
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
