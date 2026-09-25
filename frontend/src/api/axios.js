import axios from "axios";

// Central place for the backend URL.
// If you deploy the backend, just change this one line.
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// This runs before every request.
// If the user is logged in, we attach their token so protected
// backend routes (like placing an order) know who they are.
API.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem("userInfo");
  if (userInfo) {
    const { token } = JSON.parse(userInfo);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default API;
