import "./PersonalBot.scss";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../../../axios";
import defaultLogo from "../../../../imgs/dixie.svg";
import config from "../../../../config.json";
import LayoutContainer from "../../../../components/LayoutContainer";
import Title from "../../../../components/Title";
import Select from "../../../../components/Select";
import TextInput from "../../../../components/TextInput";
import Button from "../../../../components/Button";
import ImageInput from "../../../../components/ImageInput";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PersonalBot() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [responseMessage, setResponseMessage] = useState("");
  const [error, setError] = useState(null);
  const [apperence, setApperence] = useState({
    avatar: false,
    name: "Dixie",
    status: "Online",
    activityType: "None",
    activity: "",
    clientId: config.clientId,
  });

  useEffect(() => {
    axios
      .get(`/dashboard/general/personal-bot/apperence/${id}`)
      .then((res) => {
        setApperence(res.data);
      })
      .catch((err) => {
        setError(err.message);
        toast.error(err.message, {
          className: "custom-toast-error",
        });
      });
  }, [id]);

  const handleSubmit = async (e) => {
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

      try {
        const response = await axios.post(`/client/apperence/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setResponseMessage(response.data.message);
        toast.success(response.data.message, {
          className: "custom-toast",
        });
      } catch (err) {
        toast.error(error.message, {
          className: "custom-toast-error",
        });
      }
    }
  };

  return (
    <>
      <ToastContainer position="bottom-center" className="toast-container" />
      <LayoutContainer headTitle="Personal Bot" handleSubmit={handleSubmit}>
        <Title>Personal Bot</Title>
        <section className="bot-preview">
          <ImageInput
            stateCheck={apperence.avatar}
            defaultValue={`${config.baseUrl}/avatars/${apperence.avatar}`}
            size="small"
            round="rounded"
          />
          <TextInput
            name="Bot Name"
            placeholder="Enter bot name"
            defaultValue={apperence.name}
          />
          <Select
            name="Status"
            defaultValue={apperence.status}
            options={[
              { value: "Online", label: "Online" },
              { value: "Idle", label: "Idle" },
              { value: "DoNotDisturb", label: "DoNotDisturb" },
              { value: "Invisible", label: "Invisible" },
            ]}
          />

          <div className="activity">
            <Select
              name="Activity Type"
              defaultValue={apperence.activityType}
              options={[
                { value: "None", label: "None" },
                { value: "Playing", label: "Playing" },
                { value: "Watching", label: "Watching" },
                { value: "Listening", label: "Listening" },
                { value: "Streaming", label: "Streaming" },
                { value: "Competing", label: "Competing" },
                { value: "None", label: "None" },
              ]}
            />
            <TextInput
              placeholder="Enter bot name"
              defaultValue={apperence.activity}
            />
          </div>
          <div className="btn-div">
            <Button
              onClick={() => {
                window.open(
                  `https://discord.com/api/oauth2/authorize?client_id=${apperence.clientId}&permissions=8&scope=bot%20applications.commands`
                );
              }}
            >
              Invite
            </Button>
            <Button href={`/dashboard/${id}/personal-bot/login`}>Change</Button>
            <Button type="submit">Save</Button>
          </div>
        </section>
      </LayoutContainer>
    </>
  );
}

export default PersonalBot;
