import axios from "axios";
import { apiError, apiResponse } from "./apiResponseHandler";

const api = axios.create({
    baseURL: "", // TODO: update later when API is ready
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
      },
});

api.interceptors.request.use((config) => {
    const token = ""; // TODO: add bearer token from AsyncStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

api.interceptors.response.use(
  apiResponse,
  apiError,
);
  
export default api;