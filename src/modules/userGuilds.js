import axios from "../axios";
import Cookies from "universal-cookie";

async function getUserGuilds() {
  const cookies = new Cookies(null, { path: "/" });
  const token = cookies.get("token");

  if (!token) return null;

  const resposne = await axios
    .get("/dashboard/servers", {
      headers: {
        token,
      },
    })
    .catch((err) => {
      return null;
    });

  if (resposne.status !== 200) return null;

  return resposne.data;
}

export default getUserGuilds;
