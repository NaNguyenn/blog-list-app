import axios from "axios";

const api = axios.create();

let authToken = null;

export const setAuthToken = (token) => {
  authToken = token ? `Bearer ${token}` : null;
};

api.interceptors.request.use((config) => {
  if (authToken) {
    config.headers.Authorization = authToken;
  }

  return config;
});

export default api;
