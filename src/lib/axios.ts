import axios, { AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CONSTANTS } from "../constants";

const MAX_TOKEN_REFRESH_ATTEMPTS = 3;

export const api = axios.create({
  baseURL: "http://192.168.0.22:5050",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (requestConfig) => {
    const accessToken = await AsyncStorage.getItem("@Savvy:accessToken");

    if (accessToken) {
      requestConfig.headers.Authorization = `Bearer ${accessToken}`;
    }

    return requestConfig;
  },
  (err) => {
    console.error(err);
    return Promise.reject(err);
  }
);

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];
let retryCount = 0;

api.interceptors.response.use(
  (response) => response,
  async (err) => {
    const originalRequest = err.config;

    if (err.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        await new Promise<void>((resolve) => {
          refreshSubscribers.push((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve();
          });
        });

        return api(originalRequest);
      }

      const refreshToken = await AsyncStorage.getItem("@Savvy:refreshToken");

      if (!refreshToken) {
        return Promise.reject(err);
      }

      if (retryCount >= MAX_TOKEN_REFRESH_ATTEMPTS) {
        console.log("Maximum token refresh attempts reached");
        AsyncStorage.multiRemove([
          "@Savvy:accessToken",
          "@Savvy:refresh_token",
        ]);
        return Promise.reject(err);
      }

      originalRequest._retry = true;
      isRefreshing = true;
      retryCount++;

      try {
        const response = await api.post("/refresh-token", {
          refreshToken,
        });

        await AsyncStorage.setItem("@Savvy:accessToken", response.data.token);

        refreshSubscribers.forEach((subscriber) =>
          subscriber(response.data.token)
        );
        refreshSubscribers = [];
        retryCount = 0;

        return api(originalRequest);
      } catch (err) {
        if (err instanceof AxiosError) {
          if (err.response?.status === CONSTANTS.STATUS_CODES.UNAUTHORIZED) {
            return Promise.reject(originalRequest);
          }
        }

        console.error("Error during token refresh", err);
        AsyncStorage.multiRemove(["@Savvy:accessToken", "@Savvy:refreshToken"]);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(err);
  }
);
