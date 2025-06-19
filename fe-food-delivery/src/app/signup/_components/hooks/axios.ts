// lib/axios.ts (in frontend project)
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/auth",
  withCredentials: true,
});

export default api;
