import { AxiosInstance } from "axios";
import urlJoin from "url-join";

import {
  APIModelID,
  CreateOrganizationRequest,
  Organization,
  PaginatedResponse,
} from "@/api/types";

export function organizationApiClient(axiosInstance: AxiosInstance) {
  const apiPath = "Organizations";

  return {
    list: async (): Promise<PaginatedResponse<Organization>> => {
      return (await axiosInstance.get(apiPath)).data;
    },
    create: async (data: CreateOrganizationRequest): Promise<Organization> => {
      return (await axiosInstance.post(apiPath, data)).data;
    },
    get: async (id: APIModelID): Promise<Organization> => {
      return (await axiosInstance.get(urlJoin(apiPath, id))).data;
    },
  };
}
