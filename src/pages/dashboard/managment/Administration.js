import React, { useState, useEffect } from "react";
import axios from "../../../axios";
import { useParams } from "react-router-dom";
import Title from "../../../components/Title";
import Multiselect from "../../../components/Multiselect";
import LayoutContainer from "../../../components/LayoutContainer";

const Administration = () => {
  const { id } = useParams();

  const [infractions, setInfractions] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState({});
  const [selectedCommands, setSelectedCommands] = useState([]);
  const [responseMessage, setResponseMessage] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `/dashboard/management/administration/${id}`
        );
        const { warnings, commands } = response.data;
        setInfractions(warnings || []);
        const commandsData = commands || [];
        setSelectedCommands(commandsData.map((command) => command.command));
        const rolesData = {};
        commandsData.forEach((command) => {
          rolesData[command.command] = command.roles.map((role) => ({
            value: role,
            label: role,
          }));
        });
        setSelectedRoles(rolesData);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchData();
  }, [id]);

  const handleAddItem = () => {
    setInfractions([
      ...infractions,
      { numInfractions: 0, punishmentType: "none", time: 0 },
    ]);
  };

  const handleItemSubmit = async () => {
    const requestData = {
      commands: selectedCommands.map((command) => ({
        command,
        roles: Array.isArray(selectedRoles[command])
          ? selectedRoles[command].map((role) => role.value)
          : [],
      })),
      infractions,
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

  const handleSubmit = (event) => {
    event.preventDefault();
    handleItemSubmit();
  };

  const handleCommandsChange = (updatedCommands, updatedRoles) => {
    setSelectedCommands(updatedCommands);
    setSelectedRoles(updatedRoles);
  };

  const handleChangeInfraction = (index, key, value) => {
    const updatedInfractions = [...infractions];
    updatedInfractions[index][key] = value;
    setInfractions(updatedInfractions);
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
        Add Item
      </button>
      <div>
        <h2>Infractions</h2>
        {infractions.map((item, index) => (
          <ItemSection
            key={index}
            index={index}
            data={item}
            onChange={handleChangeInfraction}
          />
        ))}
      </div>
      <CommandsSection
        selectedCommands={selectedCommands}
        selectedRoles={selectedRoles}
        onChange={handleCommandsChange}
      />
      <button
        type="submit"
        style={{ marginTop: "20px" }}
        onClick={handleSubmit}
      >
        Submit
      </button>
      {responseMessage && <p className="response-message">{responseMessage}</p>}
    </LayoutContainer>
  );
};

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

function CommandsSection({ onChange, selectedCommands, selectedRoles }) {
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

  const staticRoles = [
    { value: "Role 1", label: "Role 1" },
    { value: "Role 2", label: "Role 2" },
    { value: "Role 3", label: "Role 3" },
    { value: "Role 4", label: "Role 4" },
    { value: "Role 5", label: "Role 5" },
  ];

  const handleCommandChange = (label, checked) => {
    const updatedCommands = checked
      ? [...selectedCommands, label]
      : selectedCommands.filter((cmd) => cmd !== label);

    onChange(updatedCommands, selectedRoles);
  };

  const handleMultiselectChange = (label, selectedValues) => {
    const updatedRoles = { ...selectedRoles, [label]: selectedValues };
    onChange(selectedCommands, updatedRoles);
  };

  return (
    <div className="infractions-card">
      <h2 className="commands-heading">COMMANDS</h2>
      <div className="commands-list">
        {commandList.map((command) => (
          <div key={command.value}>
            <input
              type="checkbox"
              checked={selectedCommands.includes(command.value)}
              onChange={(e) =>
                handleCommandChange(command.value, e.target.checked)
              }
              style={{ marginTop: "5px" }}
            />
            <label style={{ marginLeft: "10px" }} htmlFor={command.value}>
              {command.value}
            </label>
            {selectedCommands.includes(command.value) && (
              <div>
                <Multiselect
                  name={command.value}
                  options={staticRoles}
                  selectedOptions={
                    Array.isArray(selectedRoles[command.value])
                      ? selectedRoles[command.value]
                      : []
                  }
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
