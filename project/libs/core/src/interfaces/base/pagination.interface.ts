export interface PaginationResult<T = void, Q = void> {
  entities: T[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  filters?: Q;
}
