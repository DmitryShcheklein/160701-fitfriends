import { DefaultSort } from '../../const';
import { ProductType, WireCount, SortBy, SortDirection } from '../../enums';
import { PriceAggregationResult } from '../base/price-aggregation-result.interface';

export interface ProductsFilter {
  price: {
    min: PriceAggregationResult['minPrice'];
    max: PriceAggregationResult['maxPrice'];
  };
  type: ProductType[];
  wireCount: WireCount[];
  sortBy: typeof SortBy;
  sortDirection: typeof SortDirection;
  defaultSort: typeof DefaultSort;
}
