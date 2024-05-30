import React from "react";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Multiselect from "../../components/Multiselect";

import "./Dashboard.scss";

function Dashboard() {
  const initialValues = [
    { value: "2", text: "option 2" },
    { value: "4", text: "option 4" },
  ];

  function handleMultiselectChange(selectedValues) {
    console.log(selectedValues);
  }
  return (
    <>
      <Navbar navType="nav-dashboard" />
      <Header title="Dashboard" />

      <main className="dashboard">
        <Sidebar />
        <section className="dashboard-content">
          <h1>Dashboard</h1>
          <p>Welcome to the dashboard</p>
          <Multiselect
            label="Allowed Roles"
            initialSelectedValues={initialValues}
            onChange={handleMultiselectChange}
          >
            <li value="1">option 1</li>
            <li value="2">option 2</li>
            <li value="3">option 3</li>
            <li value="4">option 4</li>
            <li value="5">option 5</li>
          </Multiselect>
        </section>
      </main>
    </>
  );
}

export default Dashboard;
