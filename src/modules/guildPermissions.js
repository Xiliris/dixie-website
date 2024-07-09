import axios from "../axios";
import Cookies from "universal-cookie";

async function getGuildPermissions(id) {
  const cookies = new Cookies(null, { path: "/" });
  const token = cookies.get("token");

  if (!token) return null;

  const response = await axios
    .get(`/dashboard/permissions/${id}`, {
      headers: {
        token,
      },
    })
    .catch((error) => {
      console.log(error);
      return null;
    });

  if (!response) return null;
  return response.data;
}

export default getGuildPermissions;
