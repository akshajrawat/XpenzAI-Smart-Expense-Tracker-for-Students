import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER || "http://localhost:3000",
  withCredentials: true,
});

export default axiosInstance;
