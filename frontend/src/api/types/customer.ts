import { MinimalAPIModel, APIModel } from "@/api/types/base";

export interface CustomerFields {
  name: string;
}

export interface MinimalCustomer extends MinimalAPIModel, CustomerFields {}
export interface Customer extends APIModel, CustomerFields {}

export interface CreateCustomerRequest {
  name: string;
}
