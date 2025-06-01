import axios from "axios";
import { baseUrl } from "./url";

const axiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

export default axiosInstance