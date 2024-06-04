import { useEffect, useState } from "react";
import "./Profile.scss";
import Navbar from "../../components/Navbar";
import Header from "../../components/Header";
import getUserData from "../../modules/userData";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import Select from "../../components/Select";

import defaultLogo from "../../imgs/dixie.svg";
import config from "../../config.json";

function Profile() {
  const [user, setUser] = useState({});

  useEffect(() => {
    async function getUser() {
      const user = await getUserData();

      if (user) {
        setUser(user);
      }
    }
    getUser();
  }, []);

  function handleChange(e) {}
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <>
      <Navbar />
      <Header title="Profile" />
      <main className="profile-container">
        <section className="profile-info">
          <img
            src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp?size=512`}
            alt="Profile avatar"
          />
          <div className="user">
            <h3>{user.global_name}</h3>
            <p>{user.email}</p>
            <p>{user.id}</p>
          </div>
        </section>
        <section className="personal-bot-container">
          <h2>Personal Bot</h2>
          <hr />
          <div>
            <form onSubmit={handleSubmit}>
              <PersonalBot appearance={{}} />
              <div className="buttons">
                <Button href="/profile/personal-bot/login">New Bot</Button>
                <Button type="submit">Save</Button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}

function PersonalBot({ appearance }) {
  const [avatar, setAvatar] = useState(appearance.avatar || defaultLogo);

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
  return (
    <article className="personal-bot">
      <div className="name">
        <img
          src={avatar}
          alt="Bot logo"
          onClick={(e) => {
            changeImage(e);
          }}
        />

        <input type="file" accept="image/*" />
        <TextInput
          name="Name"
          defaultValue={appearance.name}
          placeholder={"What is your bots name"}
        />
      </div>
      <Select
        name="Status"
        options={[
          { value: "Online", label: "Online" },
          { value: "Idle", label: "Idle" },
          { value: "DoNotDisturb", label: "DoNotDisturb" },
          { value: "Invisible", label: "Invisible" },
        ]}
      />
      <div className="activity-container">
        <Select
          options={[
            { value: "Playing", label: "Playing" },
            { value: "Watching", label: "Watching" },
            { value: "Listening", label: "Listening" },
            { value: "Streaming", label: "Streaming" },
            { value: "Competing", label: "Competing" },
            { value: "None", label: "None" },
          ]}
        />
        <TextInput
          defaultValue={appearance.activity}
          placeholder={"What is your bot doing"}
        />
      </div>
    </article>
  );
}

export default Profile;
