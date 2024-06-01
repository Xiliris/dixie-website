import React, { useState, useEffect } from "react";
import axios from "../../../axios";
import { useParams } from "react-router-dom";
import "./ChatManagment.scss";
import Title from "../../../components/Title";
import "../../../components/Multiselect.scss";
import Multiselect from "../../../components/Multiselect";
import LayoutContainer from "../../../components/LayoutContainer";

const commandList = [
  { label: "/ban", value: "ban" },
  { label: "/unban", value: "unban" },
  { label: "/mute", value: "mute" },
  { label: "/unmute", value: "unmute" },
  { label: "/kick", value: "kick" },
  { label: "/clear", value: "clear" },
  { label: "/nuke", value: "nuke" },
  { label: "/lock", value: "lock" },
  { label: "/warn", value: "warn" },
  { label: "/list-warnings", value: "list-warnings" },
  { label: "/remove-warnings", value: "remove-warnings" },
];

function Administration() {
  const { id } = useParams();

  const [infractions, setInfractions] = useState([]);
  const [error, setError] = useState(null);
  const [selectedRoles, setSelectedRoles] = useState({});
  const [selectedCommands, setSelectedCommands] = useState([]);
  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => {
    async function fetchInfractions() {
      try {
        const response = await axios.get(
          `/dashboard/management/administration/${id}`
        );
        const data = response.data.warnings;
        setInfractions(data);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchInfractions();
  }, [id]);

  const handleChange = (index, key, value) => {
    const updatedInfractions = infractions.map((infraction, i) =>
      i === index ? { ...infraction, [key]: value } : infraction
    );
    setInfractions(updatedInfractions);
  };

  const handleAddItem = () => {
    setInfractions([
      ...infractions,
      { numInfractions: 0, punishmentType: "none", time: 0 },
    ]);
  };

  const handleItemSubmit = async () => {
    const requestData = {
      commands: selectedCommands,
      infractions,
      roles: Object.keys(selectedRoles).reduce((acc, key) => {
        acc[key] = selectedRoles[key].map((role) => role.value);
        return acc;
      }, {}),
    };

    try {
      const response = await axios.post(
        `/dashboard/management/administration/${id}`,
        requestData
      );
      setResponseMessage(response.data.message);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCommandsChange = (data) => {
    setSelectedRoles(data.roles);
    setSelectedCommands(data.commands);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleItemSubmit();
  };

  return (
    <LayoutContainer handleSubmit={handleSubmit} headTitle="Administration">
      <Title>Administration</Title>
      {error && <p className="error-message">{error}</p>}
      <button
        type="button"
        onClick={handleAddItem}
        style={{ marginBottom: "20px" }}
      >
        Add Warning
      </button>

      {infractions.map((item, index) => (
        <ItemSection
          key={index}
          index={index}
          data={item}
          onChange={handleChange}
        />
      ))}

      <CommandsSection onChange={handleCommandsChange} />

      <button type="submit" style={{ marginTop: "20px" }}>
        Submit
      </button>
      {responseMessage && <p className="response-message">{responseMessage}</p>}
    </LayoutContainer>
  );
}

function ItemSection({ index, data, onChange }) {
  return (
    <article className="infractions-card">
      <div>
        <h2>WARNING {index + 1}</h2>
        <div>
          <label>Number of Infractions</label>
          <input
            type="number"
            min="0"
            value={data.numInfractions}
            onChange={(e) => onChange(index, "numInfractions", e.target.value)}
          />
        </div>
        <div>
          <label>Punishment Type</label>
          <select
            value={data.punishmentType}
            onChange={(e) => onChange(index, "punishmentType", e.target.value)}
          >
            <option value="none">none</option>
            <option value="kick">kick</option>
            <option value="mute">mute</option>
            <option value="ban">ban</option>
          </select>
        </div>
        {(data.punishmentType === "mute" || data.punishmentType === "ban") && (
          <div>
            <label>
              Time in <br />
              seconds (0 is permanent)
            </label>
            <input
              type="number"
              min="0"
              value={data.time}
              onChange={(e) => onChange(index, "time", e.target.value)}
            />
          </div>
        )}
      </div>
    </article>
  );
}

function CommandsSection({ onChange }) {
  const [selectedRoles, setSelectedRoles] = useState({});
  const [selectedCommands, setSelectedCommands] = useState([]);
  const [multiselectVisibility, setMultiselectVisibility] = useState({});

  const staticRoles = [
    { value: "1", label: "Role 1" },
    { value: "2", label: "Role 2" },
    { value: "3", label: "Role 3" },
    { value: "4", label: "Role 4" },
    { value: "5", label: "Role 5" },
  ];

  const handleCommandChange = (label, checked) => {
    const updatedCommands = checked
      ? [...selectedCommands, label]
      : selectedCommands.filter((cmd) => cmd !== label);
    setSelectedCommands(updatedCommands);
    onChange({ commands: updatedCommands, roles: selectedRoles });

    setMultiselectVisibility({
      ...multiselectVisibility,
      [label]: checked,
    });
  };

  const handleMultiselectChange = (name, selectedValues) => {
    setSelectedRoles({ ...selectedRoles, [name]: selectedValues });
    onChange({
      commands: selectedCommands,
      roles: { ...selectedRoles, [name]: selectedValues },
    });
  };

  return (
    <div className="infractions-card">
      <h2 className="commands-heading">COMMANDS</h2>
      <div className="commands-list">
        {commandList.map((command) => (
          <div key={command.value}>
            <input
              type="checkbox"
              onChange={(e) =>
                handleCommandChange(command.value, e.target.checked)
              }
              style={{ marginTop: "5px" }}
            />
            <label style={{ marginLeft: "10px" }} htmlFor={command.value}>
              {command.value}
            </label>
            {multiselectVisibility[command.value] && (
              <div>
                <Multiselect
                  name={command.value}
                  options={staticRoles}
                  onChange={handleMultiselectChange}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Administration;
