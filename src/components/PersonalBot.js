import "./PersonalBot.scss";
import Navbar from "./Navbar";
import Header from "./Header";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "../axios";
import defaultLogo from "../imgs/dixie.svg";
import config from "../config";

function PersonalBot({ apperence }) {
  const { id } = useParams();
  const navigate = useNavigate();

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
    e.preventDefault();

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

      await axios
        .post(`/client/apperence/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .catch((err) => {
          navigate("/errors/401");
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
            <img
              src={
                apperence.avatar
                  ? `${config.baseUrl}/avatars/${apperence.avatar}`
                  : defaultLogo
              }
              alt="Bot logo"
              onClick={(e) => {
                changeImage(e);
              }}
            />
            <input type="file" accept="image/*" />
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter bot name"
              defaultValue={apperence.name}
            />
            <label>Status</label>
            <input
              type="text"
              placeholder="Enter bot status"
              defaultValue={apperence.status}
            />
            <label>Description</label>
            <textarea
              placeholder="Enter bot description"
              defaultValue={apperence.description}
            ></textarea>
            <div>
              <button
                onClick={() => {
                  window.open(
                    `https://discord.com/api/oauth2/authorize?client_id=${apperence.clientId}&permissions=8&scope=bot%20applications.commands`
                  );
                }}
              >
                Invite
              </button>
              <button type="submit">Save</button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}

export default PersonalBot;
