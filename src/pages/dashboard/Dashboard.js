import { Link, useParams } from "react-router-dom";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";

import "./Dashboard.scss";

function Dashboard() {
  return (
    <>
      <Navbar />
      <Header title="Dashboard" />

      <main className="dashboard">
        <h1>Dashboard</h1>
        <section>
          <h2>General</h2>
          <div>
            <ArticleItem
              title={"Settings"}
              description={
                "Configure the settings of your Discord server to ensure a smooth and enjoyable experience for all members."
              }
            />
            <ArticleItem
              title={"Personal Bot"}
              description={
                "Customize your Discord bot to perfectly fit the unique needs of your personal server."
              }
              status={"radio_button_unchecked"}
              link={"/personal-bot"}
            />
          </div>
        </section>
        <section>
          <h2>Server Managment</h2>
          <div>
            <ArticleItem
              title={"Welcome & Goodbye"}
              description={
                "Enhance your experience by personalizing the welcome message, roles, and user verification process to suit your community's needs."
              }
              status={"radio_button_unchecked"}
            />
            <ArticleItem
              title={"Auto Roles"}
              description={
                "Efficiently manage your Discord server by assigning roles to users based on your specific requirements."
              }
              status={"radio_button_unchecked"}
            />
          </div>
        </section>
      </main>
    </>
  );
}

function ArticleItem({ title, description, status, link }) {
  const { id } = useParams();
  return (
    <article>
      <div>
        <h3>{title}</h3>
        {status ? (
          <span class="material-symbols-outlined">{`${status}`}</span>
        ) : (
          ""
        )}
      </div>
      <p>{description}</p>
      <Link to={`/dashboard/${id}${link}`}>
        <button>EDIT</button>
      </Link>
    </article>
  );
}

export default Dashboard;
