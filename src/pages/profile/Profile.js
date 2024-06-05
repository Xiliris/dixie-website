import { useEffect, useState } from "react";
import "./Profile.scss";
import Navbar from "../../components/Navbar";
import Header from "../../components/Header";
import getUserData from "../../modules/userData";

function Profile() {
  const [user, setUser] = useState({});

  useEffect(() => {
    async function getUser() {
      const user = await getUserData();

      if (user) {
        setUser(user);
      }
    }
    getUser();
  }, []);

  function handleChange(e) {}
  function handleSubmit(e) {
    e.preventDefault();
  }

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
          <div className="user">
            <h3>{user.global_name}</h3>
            <p>{user.email}</p>
            <p>{user.id}</p>
          </div>
        </section>
      </main>
    </>
  );
}

export default Profile;
