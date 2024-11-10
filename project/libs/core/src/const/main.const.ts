import { SortBy, SortDirection } from '@project/enums';

export const DefaultItemsLimit = {
  Min: 6,
  Max: 50,
};

export const DefaultSort = {
  DIRECTION: SortDirection.Asc,
  BY: SortBy.createdAt,
} as const;
