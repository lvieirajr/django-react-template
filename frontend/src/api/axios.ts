import { useRef } from "react";
import axios, { AxiosInstance } from "axios";
import applyCaseMiddleware from "axios-case-converter";
import { useAuth0 } from "@auth0/auth0-react";

import { BASE_API_URL } from "@/environment";

export const useAxios = (): AxiosInstance => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const axiosInstanceRef = useRef<AxiosInstance>(
    applyCaseMiddleware(axios.create({ baseURL: BASE_API_URL, withCredentials: true })),
  );

  axiosInstanceRef.current.interceptors.request.clear();
  axiosInstanceRef.current.interceptors.request.use(async (config) => {
    if (isAuthenticated) {
      config.headers.Authorization = `Bearer ${await getAccessTokenSilently()}`;
    }

    return config;
  });

  return axiosInstanceRef.current;
};
