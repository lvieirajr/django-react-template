import { useAxios } from "./axios";
import { organizationApiClient } from "./clients";

export function useAPIClient() {
  const axiosInstance = useAxios();

  return {
    organizations: organizationApiClient(axiosInstance),
  };
}
