import { MinimalAPIModel, APIModel } from "@/api/types/base";

export interface MinimalOrganizationFields {
  name: string;
  logo?: string;
}

export interface OrganizationFields extends MinimalOrganizationFields {
  auth0Id: string;
  stripeId: string;
}

export interface MinimalOrganization
  extends MinimalAPIModel,
    MinimalOrganizationFields {}
export interface Organization extends APIModel, OrganizationFields {}

export interface CreateOrganizationRequest {
  name: string;
}
