import axios, { AxiosRequestConfig } from "axios";
import { isTokenExpired } from "../services/isTokenExpired";

export const BASE_REQUEST_URL = "http://localhost:8000/api/v1";
export const BASE_REQUEST_URL1 = "http://localhost:8000/api/v2/auths";

const API = axios.create({
  baseURL: BASE_REQUEST_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
  },
//   withCredentials: true,
});

API.interceptors.request.use(
  async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
    let token = localStorage.getItem("token");

    if (token && isTokenExpired(token)) {
      try {
        const response = await axios.post(
          `${BASE_REQUEST_URL1}/refresh-token`,
          null,
          {
            // withCredentials: true,
          }
        );

        const newToken = response.data.accessToken;
        if (newToken) {
          token = newToken;
          localStorage.setItem("token", token);
        }
      } catch (error) {
        console.error("Refresh Token failed:", error);
        token = null;
      }
    }

    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
