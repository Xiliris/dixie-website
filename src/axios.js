import Axios from "axios";

const axios = Axios.create({
  baseURL: "https://dixie-server.onrender.com",
});

export default axios;
