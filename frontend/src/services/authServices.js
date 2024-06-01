// src/services/authService.js
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

export const register = async (data) => {
  const response = await axios.post(`${API_URL}/register`, data);
  return response.data;
};

export const login = async (data) => {
  const response = await axios.post(`${API_URL}/login`, data);
  localStorage.setItem("token", response.data.token);
  return response.data;
};

export const getUser = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const response = await axios.get(`${API_URL}/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
