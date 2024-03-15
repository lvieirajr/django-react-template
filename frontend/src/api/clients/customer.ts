import { AxiosInstance } from "axios";
import urlJoin from "url-join";

import { APIModelID, Customer, PaginatedResponse } from "@/api/types";

export function customerApiClient(axiosInstance: AxiosInstance) {
  const BASE_API_URL = "/customers";

  return {
    list: async (): Promise<PaginatedResponse<Customer>> => {
      return (await axiosInstance.get(BASE_API_URL)).data;
    },
    get: async (id: APIModelID): Promise<Customer> => {
      return (await axiosInstance.get(urlJoin(BASE_API_URL, id))).data;
    },
  };
}
