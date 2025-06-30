import axios from "axios";
import { apiError, apiResponse } from "./apiResponseHandler";
import { API_URL, API_TOKEN } from '@env'
import { loadFromLocal, localKeys } from "./localStorage";

const api = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'apikey': API_TOKEN,
    'Authorization': `Bearer ${API_TOKEN}`,
  },
});

api.interceptors.request.use(async (config) => {
  const token = await loadFromLocal<string | undefined>(localKeys.ACCESS_TOKEN);
  config.headers.Authorization = `Bearer ${(token) ? token : API_TOKEN}`;
  return config;
});

api.interceptors.response.use(
  apiResponse,
  apiError,
);

export default api;