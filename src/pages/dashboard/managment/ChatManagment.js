import React, { useState, useEffect, useCallback } from "react";
import axios from "../../../axios";
import { useParams } from "react-router-dom";
import "./ChatManagment.scss";
import Title from "../../../components/Title";
import LayoutContainer from "../../../components/LayoutContainer";
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

  const handleChange = async (section, key, value) => {
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
    const transformedSections = Object.keys(sections).reduce((acc, section) => {
      acc[section] = {
        ...sections[section],
        disabledChannels: sections[section].disabledChannels
          ? sections[section].disabledChannels.map((channel) => ({
              id: channel.value ? channel.value : channel.id,
              name: channel.label ? channel.label : channel.name,
            }))
          : [],
        allowedRoles: sections[section].allowedRoles
          ? sections[section].allowedRoles.map((role) => ({
              id: role.value ? role.value : role.id,
              name: role.label ? role.label : role.name,
            }))
          : [],
      };
      return acc;
    }, {});

    const requestData = {
      chatManagement: transformedSections,
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
      <LayoutContainer handleSubmit={handleSubmit} headTitle="Chat Management">
        <Title>Chat Management</Title>
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
      </LayoutContainer>
    </>
  );
}

const ItemSection = ({ title, data, guildChannels, guildRoles, onChange }) => {
  const handleChannelsChange = (name, selectedOptions) => {
    console.log("selectedOptions", selectedOptions);
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
        name="Disabled Channels"
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
