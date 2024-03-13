import axios, { AxiosInstance } from "axios";
import applyCaseMiddleware from "axios-case-converter";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

import { BASE_API_URL } from "@/environment";

export const useAxios = (): AxiosInstance => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const axiosInstance = applyCaseMiddleware(
    axios.create({ baseURL: BASE_API_URL, withCredentials: true }),
  );

  useEffect(() => {
    if (isAuthenticated) {
      getAccessTokenSilently().then((accessToken) => {
        axiosInstance.interceptors.request.use((config) => {
          config.headers = config.headers ?? {};
          config.headers.Authorization = `Bearer ${accessToken}`;

          return config;
        });
      });
    }
  }, [axiosInstance, getAccessTokenSilently, isAuthenticated]);

  return axiosInstance;
};
