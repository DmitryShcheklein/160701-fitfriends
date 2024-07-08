import {
  FitnessLevel,
  SortBy,
  SortDirection,
  WorkoutDuration,
  WorkoutType,
} from '@project/enums';
import { PriceAggregationResult } from '../base/price-aggregation-result.interface';

export interface TrainingsFilter {
  price: {
    min: PriceAggregationResult['minPrice'];
    max: PriceAggregationResult['maxPrice'];
  };
  trainingType?: WorkoutType[];
  level?: FitnessLevel[];
  duration?: WorkoutDuration[];
  sortBy?: SortBy;
  sortDirection?: SortDirection;
}
