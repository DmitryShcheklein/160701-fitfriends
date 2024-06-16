export interface PaginationResult<T, Q> {
  entities: T[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  filters: Q;
}
