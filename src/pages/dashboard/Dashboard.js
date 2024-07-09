import React from "react";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

import "./Dashboard.scss";

function Dashboard() {
  return (
    <>
      <Navbar navType="nav-dashboard" />
      <Header title="Dashboard" />

      <main className="dashboard">
        <Sidebar />
        <section className="dashboard-content">
          <h1>Dashboard</h1>
          <p>Welcome to the dashboard</p>
        </section>
      </main>
    </>
  );
}

export default Dashboard;
