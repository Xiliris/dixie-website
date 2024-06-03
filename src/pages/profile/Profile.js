import { useEffect, useState } from "react";
import "./Profile.scss";
import Navbar from "../../components/Navbar";
import Header from "../../components/Header";
import getUserData from "../../modules/userData";

function Profile() {
  const [user, setUser] = useState({});

  console.log(user);

  useEffect(() => {
    async function getUser() {
      const user = await getUserData();

      if (user) {
        setUser(user);
      }
    }
    getUser();
  }, []);

  return (
    <>
      <Navbar />
      <Header title="Profile" />
      <main className="profile-container">
        <section className="profile-info">
          <img
            src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp?size=512`}
            alt="Profile avatar"
          />
          <div>
            <h3>{user.global_name}</h3>
            <p>{user.email}</p>
            <p>{user.id}</p>
          </div>
        </section>
        <section className="profile-perks">
          <h3>Personal Bot</h3>
          <p>Setup</p>
        </section>
      </main>
    </>
  );
}

export default Profile;
