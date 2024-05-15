import config from "./config";
import Axios from "axios";

const axios = Axios.create({
  baseURL: config.baseUrl,
});

export default axios;
