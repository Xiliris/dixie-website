import React, { useState, useEffect, useCallback } from "react";
import axios from "../../../axios";
import { useParams } from "react-router-dom";
import "./ChatManagment.scss";
import Navbar from "../../../components/Navbar";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import Multiselect from "../../../components/Multiselect";

function ChatManagment() {
  const { id } = useParams();
  const [sections, setSections] = useState({});
  const [guildChannels, setGuildChannels] = useState([]);
  const [guildRoles, setGuildRoles] = useState([]);

  useEffect(() => {
    axios
      .get(`/dashboard/management/chat/${id}`)
      .then((response) => {
        const responseData = response.data;
        if (responseData && responseData.chat) {
          setSections(responseData.chat);
          setGuildChannels(responseData.channels);
          setGuildRoles(responseData.roles);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleChange = useCallback((section, key, value) => {
    setSections((prevState) => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [key]: value,
      },
    }));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const requestData = {
      chatManagement: {
        ...sections,
        ...Object.keys(sections).reduce((acc, section) => {
          acc[section] = {
            ...sections[section],
            disabledChannels: sections[section].disabledChannels.map(
              (channel) => ({
                id: channel.value,
                name: channel.label,
              })
            ),
            allowedRoles: sections[section].allowedRoles.map((role) => ({
              id: role.value,
              name: role.label,
            })),
          };
          return acc;
        }, {}),
      },
    };

    axios
      .post(`/dashboard/management/chat/${id}`, requestData)
      .then((response) => {
        console.log("Data saved successfully:", response.data);
      })
      .catch((error) => {
        console.error("There was an error saving the data!", error);
      });
  };

  return (
    <>
      <Navbar navType="nav-dashboard" />
      <Header title="Chat Management" />
      <main className="chat-managment">
        <Sidebar />
        <section>
          <form onSubmit={handleSubmit}>
            <div className="item-container">
              {Object.keys(sections).map((section) => (
                <ItemSection
                  key={section}
                  title={section}
                  data={sections[section]}
                  guildChannels={guildChannels}
                  guildRoles={guildRoles}
                  onChange={handleChange}
                />
              ))}
            </div>
            <button type="submit">Submit</button>
          </form>
        </section>
      </main>
    </>
  );
}

const ItemSection = ({ title, data, guildChannels, guildRoles, onChange }) => {
  const handleChannelsChange = (name, selectedOptions) => {
    onChange(title, "disabledChannels", selectedOptions);
  };

  const handleRolesChange = (name, selectedOptions) => {
    onChange(title, "allowedRoles", selectedOptions);
  };

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
          <option value="kick">kick</option>
          <option value="ban">ban</option>
        </select>
      </div>
      <div>
        <label>
          Time in <br />
          minutes (0 is permanent)
        </label>
        <input
          type="number"
          min="0"
          value={data.time}
          onChange={(e) => onChange(title, "time", e.target.value)}
        />
      </div>
      <Multiselect
        name="Allowed Channels"
        options={guildChannels.map((channel) => ({
          value: channel.id,
          label: channel.name,
        }))}
        selectedOptions={(data.disabledChannels || []).map((channel) => ({
          value: channel.id,
          label: channel.name,
        }))}
        onChange={handleChannelsChange}
      />
      <Multiselect
        name="Allowed Roles"
        options={guildRoles.map((role) => ({
          value: role.id,
          label: role.name,
        }))}
        selectedOptions={(data.allowedRoles || []).map((role) => ({
          value: role.id,
          label: role.name,
        }))}
        onChange={handleRolesChange}
      />
    </article>
  );
};

export default ChatManagment;
