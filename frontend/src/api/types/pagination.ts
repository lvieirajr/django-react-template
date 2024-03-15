export interface PaginatedResponse<T> {
  previousPage: number | null;
  nextPage: number | null;
  page: number;
  pageSize: number;
  items: T[];
}
