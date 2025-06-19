// lib/axios.ts (in frontend project)
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000", // Your backend URL
  withCredentials: true, // if using cookies or auth
});

export default api;
