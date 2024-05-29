import React, { useState, useEffect } from "react";
import axios from "../../../axios";
import { useParams } from "react-router-dom";
import "./ChatManagment.scss";
import Navbar from "../../../components/Navbar";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";

function Administration() {
  const { id } = useParams();

  const [infractions, setInfractions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchInfractions() {
      try {
        const response = await axios.get(
          `/dashboard/managment/administration/${id}`
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

  const handleItemSubmit = async (index, setResponseMessage) => {
    const requestData = { infractions: infractions[index] };

    try {
      const response = await axios.post(
        `/dashboard/managment/administration/${id}`,
        requestData
      );
      setResponseMessage(`${response.data.message}`);
    } catch (error) {
      setResponseMessage(`${error.message}`);
    }
  };

  return (
    <>
      <Navbar navType="nav-dashboard" />
      <Header title="Administration" />
      <main className="chat-managment">
        <Sidebar />
        <main>
          {error && <p className="error-message">{error}</p>}
          <button
            type="button"
            onClick={handleAddItem}
            style={{ marginBottom: "20px" }}
          >
            Add Item
          </button>

          {infractions.map((item, index) => (
            <ItemSection
              key={index}
              index={index}
              data={item}
              onChange={handleChange}
              onItemSubmit={handleItemSubmit}
            />
          ))}
        </main>
      </main>
    </>
  );
}

function ItemSection({ index, data, onChange, onItemSubmit }) {
  const [responseMessage, setResponseMessage] = useState("");

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
      <button
        type="submit"
        onClick={() => onItemSubmit(index, setResponseMessage)}
        style={{ marginTop: "20px", marginBottom: "20px" }}
      >
        Submit
      </button>
      {responseMessage && <p className="response-message">{responseMessage}</p>}
    </article>
  );
}

export default Administration;
