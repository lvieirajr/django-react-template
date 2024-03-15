import { AxiosInstance } from "axios";
import urlJoin from "url-join";

import {
  APIModelID,
  CreateCustomerRequest,
  Customer,
  PaginatedResponse,
} from "@/api/types";

export function customerApiClient(axiosInstance: AxiosInstance) {
  const apiPath = "customers";

  return {
    list: async (): Promise<PaginatedResponse<Customer>> => {
      return (await axiosInstance.get(apiPath)).data;
    },
    create: async (data: CreateCustomerRequest): Promise<Customer> => {
      return (await axiosInstance.post(apiPath, data)).data;
    },
    get: async (id: APIModelID): Promise<Customer> => {
      return (await axiosInstance.get(urlJoin(apiPath, id))).data;
    },
  };
}
