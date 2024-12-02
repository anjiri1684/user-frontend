import axios from "axios";

const API_URL = "https://www.api.nivabeats.com"; // Replace with your backend URL

// Create an instance of axios with default configurations
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptors for handling authentication token in headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
