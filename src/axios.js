import Axios from "axios";

const axios = Axios.create({
  baseURL: "dixie-server:8080",
});

export default axios;
