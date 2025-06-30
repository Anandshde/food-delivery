// lib/axios.ts (in frontend project)
import axios from "axios";

const api = axios.create({
  baseURL: "https://food-delivery-1-89kz.onrender.com/api/auth",
  withCredentials: true,
});

export default api;
