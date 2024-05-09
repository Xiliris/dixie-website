import axios from "../axios";
import Cookies from "universal-cookie";

async function getUserData() {
  const cookies = new Cookies(null, { path: "/" });
  const token = cookies.get("token");
  if (!token) return null;

  const { data, status } = await axios.get("/auth/login", {
    headers: {
      token,
    },
  });
  if (status !== 200) return null;

  cookies.set("token", data.token, { path: "/" });
  return data.user;
}

export default getUserData;
