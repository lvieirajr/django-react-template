export type APIModelID = string;

export interface MinimalAPIModel {
  id: APIModelID;
}

export interface APIModel extends MinimalAPIModel {
  createdAt: string;
  updatedAt: string;
}
