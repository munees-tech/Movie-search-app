import axios from "axios";
import { baseUrl } from "./url.js";

const axiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

export default axiosInstance