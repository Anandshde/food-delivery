// lib/axios.ts (in frontend project)
import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth`,
  withCredentials: true,
});

export default api;
