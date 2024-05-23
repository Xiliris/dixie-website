import React, { useState, useEffect } from "react";
import axios from "../../../axios";
import { useParams } from "react-router-dom";
import "./ChatManagment.scss";
import Navbar from "../../../components/Navbar";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";

function ChatManagment() {
  const { id } = useParams();
  const [sections, setSections] = useState({
    LINKS: { enabled: false, punish: "none", time: 0 },
    SPAM: { enabled: false, punish: "none", time: 0 },
    BAD_WORDS: { enabled: false, punish: "none", time: 0 },
    DUPLICATED_TEXT: { enabled: false, punish: "none", time: 0 },
    REPEATED_MESSAGES: { enabled: false, punish: "none", time: 0 },
    DISCORD_INVITES: { enabled: false, punish: "none", time: 0 },
    CAPS: { enabled: false, punish: "none", time: 0 },
    MASS_MENTION: { enabled: false, punish: "none", time: 0 },
  });

  useEffect(() => {
    axios
      .get(`/dashboard/managment/chat/${id}`)
      .then((response) => {
        setSections(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleChange = (section, key, value) => {
    setSections((prevState) => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [key]: value,
      },
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const requestData = { chatManagment: { ...sections } };

    axios
      .post(`/dashboard/managment/chat/${id}`, requestData)
      .then((response) => {
        console.log("Data saved successfully:", response.data);
      })
      .catch((error) => {
        console.error("There was an error saving the data!", error);
      });
  };

  return (
    <>
      <Navbar />
      <Header title="Chat Managment" />
      <main className="chat-managment">
        <Sidebar />
        <main>
          <form onSubmit={handleSubmit}>
            {Object.keys(sections).map((section) => (
              <ItemSection
                key={section}
                title={section}
                data={sections[section]}
                onChange={handleChange}
              />
            ))}
            <button type="submit">Submit</button>
          </form>
        </main>
      </main>
    </>
  );
}

function ItemSection({ title, data, onChange }) {
  return (
    <article>
      <div>
        <h2>{title}</h2>
        <input
          type="checkbox"
          checked={data.enabled}
          onChange={(e) => onChange(title, "enabled", e.target.checked)}
        />
      </div>
      <div>
        <label>Punish</label>
        <select
          value={data.punish}
          onChange={(e) => onChange(title, "punish", e.target.value)}
        >
          <option value="none">none</option>
          <option value="mute">mute</option>
          <option value="warn">warn</option>
          <option value="ban">ban</option>
        </select>
      </div>
      <div>
        <label>
          Time in <br />
          seconds(0 is permanent)
        </label>
        <input
          type="number"
          min="0"
          value={data.time}
          onChange={(e) => onChange(title, "time", e.target.value)}
        />
      </div>
    </article>
  );
}

export default ChatManagment;
