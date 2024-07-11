import { SortBy, SortDirection } from '@project/enums';

export const DEFAULT_PAGE_COUNT = 1;

export const DefaultTrainings = {
  MAX_COUNT_LIMIT: 50,
  COUNT_LIMIT: 6,
};

export const DefaultSort = {
  DIRECTION: SortDirection.Asc,
  BY: SortBy.createdAt,
} as const;
