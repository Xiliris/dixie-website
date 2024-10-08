import axios from "../axios";
import Cookies from "universal-cookie";

async function getUserData() {
  const cookies = new Cookies(null, { path: "/" });
  const token = cookies.get("token");
  if (!token) return null;

  const response = await axios
    .get("/auth/login", {
      headers: {
        token,
      },
    })
    .catch((error) => {
      return null;
    });
  if (!response || response.status !== 200) return null;

  cookies.set("token", response.data.token, { path: "/" });
  return response.data.user;
}

export default getUserData;
