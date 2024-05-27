import React, { useState, useEffect } from "react";
import axios from "../../../axios";
import { useParams } from "react-router-dom";
import "./ChatManagment.scss";
import Navbar from "../../../components/Navbar";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";

function Administration() {
  const { id } = useParams();
  const [infractions, setInfractions] = useState([
    { numInfractions: 0, punishmentType: "none", time: 0 },
  ]);

  useEffect(() => {
    axios
      .get(`/dashboard/administration/${id}`)
      .then((response) => {
        setInfractions(response.data || []);
      })
      .catch((error) => {
        console.error("Error fetching infractions:", error);
      });
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

  const handleItemSubmit = (index) => {
    const requestData = { infractions: infractions[index] };
    console.log("Submitting data for item", index, "with ID:", id);
    axios
      .post(`/dashboard/administration/${id}`, requestData)
      .then((response) => {
        console.log(
          `Data for item ${index} saved successfully:`,
          response.data
        );
      })
      .catch((error) => {
        console.error(`Error saving data for item ${index}:`, error);
      });
  };

  return (
    <>
      <Navbar navType="nav-dashboard" />
      <Header title="Administration" />
      <main className="chat-managment">
        <Sidebar />
        <main>
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
              onItemSubmit={() => handleItemSubmit(index)}
            />
          ))}
        </main>
      </main>
    </>
  );
}

function ItemSection({ index, data, onChange, onItemSubmit }) {
  return (
    <article className="infractions-card">
      <div>
        <h2>WARNING {index + 1}</h2>
        <div>
          <label>Number of Infractions</label>
          <input
            type="number"
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
              value={data.time}
              onChange={(e) => onChange(index, "time", e.target.value)}
            />
          </div>
        )}
      </div>
      <button
        type="submit"
        onClick={onItemSubmit}
        style={{ marginTop: "20px" }}
      >
        Submit
      </button>
    </article>
  );
}

export default Administration;
