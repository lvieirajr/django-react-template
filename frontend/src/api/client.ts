import { useAxios } from "./axios";
import { customerApiClient } from "./clients";

export function useAPIClient() {
  const axiosInstance = useAxios();

  return {
    customers: customerApiClient(axiosInstance),
  };
}
