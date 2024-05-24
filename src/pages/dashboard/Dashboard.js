import { Link, useParams } from "react-router-dom";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

import "./Dashboard.scss";

function Dashboard() {
  return (
    <>
      <Navbar />
      <Header title="Dashboard" />

      <main className="dashboard">
        <h1>Dashboard</h1>
        <Sidebar />
      </main>
    </>
  );
}

export default Dashboard;
