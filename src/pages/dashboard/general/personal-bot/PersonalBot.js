import "./PersonalBot.scss";
import Navbar from "../../../../components/Navbar";
import Header from "../../../../components/Header";
import Sidebar from "../../../../components/Sidebar";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../../../axios";
import defaultLogo from "../../../../imgs/dixie.svg";
import config from "../../../../config.json";

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
    const activityTypeInput = form.elements[3];
    const activityInput = form.elements[4];

    nameInput.style.border = "1px solid #0f060f";
    statusInput.style.border = "1px solid #0f060f";
    activityInput.style.border = "1px solid #0f060f";

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

      if (!activityTypeInput.value.trim()) {
        activityTypeInput.style.border = "1px solid red";
        isValid = false;
      }

      if (!activityInput.value.trim()) {
        activityInput.style.border = "1px solid red";
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
      formData.append("activityType", activityTypeInput.value);
      formData.append("activity", activityInput.value);
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
      <Navbar navType="nav-dashboard" />
      <Header title="Personal Bot" />
      <main className="personal-bot">
        <Sidebar />
        <div className="personal-bot-content">
          <div className="title">
            <h1>PERSONAL BOT</h1>
          </div>
          <section className="bot-preview">
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
              <div className="main-container">
                <div>
                  <label>Name</label>
                  <input
                    type="text"
                    placeholder="Enter bot name"
                    defaultValue={apperence.name}
                  />
                </div>
                <div>
                  <label>Status</label>
                  <select defaultValue={apperence.status}>
                    <option value="Online">Online</option>
                    <option value="Idle">Idle</option>
                    <option value="DoNotDisturb">Do not disturb</option>
                    <option value="Invisible">Offline</option>
                  </select>
                </div>

                <div>
                  <label>Activity</label>
                  <div className="inline-div">
                    <select defaultValue={apperence.activityType}>
                      <option value="Playing">Playing</option>
                      <option value="Watching">Watching</option>
                      <option value="Listening">Listening</option>
                      <option value="Streaming">Streaming</option>
                      <option value="Competing">Competing</option>
                      <option value="Custom">Custom</option>
                    </select>
                    <input
                      type="text"
                      placeholder="What?"
                      defaultValue={apperence.activity}
                    />
                  </div>
                </div>
                <div className="btn-div">
                  <button
                    onClick={() => {
                      window.open(
                        `https://discord.com/api/oauth2/authorize?client_id=${apperence.clientId}&permissions=8&scope=bot%20applications.commands`
                      );
                    }}
                  >
                    Invite
                  </button>
                  <button type="submit">Update</button>
                </div>
              </div>
            </form>
          </section>
        </div>
      </main>
    </>
  );
}

export default PersonalBot;
