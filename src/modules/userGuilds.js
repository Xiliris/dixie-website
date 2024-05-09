import axios from "../axios";
import Cookies from "universal-cookie";

async function getUserGuilds() {
  const cookies = new Cookies(null, { path: "/" });
  const token = cookies.get("token");

  if (!token) return null;

  const { data, status } = await axios.get("/dashboard/servers", {
    headers: {
      token,
    },
  });

  if (status !== 200) return null;

  return data;
}

export default getUserGuilds;
