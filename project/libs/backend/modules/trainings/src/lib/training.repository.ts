import { Model } from 'mongoose';
import { TrainingEntity } from './training.entity';
import { TrainingFactory } from './training.factory';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TrainingModel } from './training.model';
import { BaseMongoRepository, DefaultSort, Training } from '@project/core';
import {
  PaginationResult,
  PriceAggregationResult,
  TrainingsFilter,
  TrainingsQuery,
} from '@project/core';
import { DEFAULT_PAGE_COUNT, DefaultTrainings } from '@project/core';
import { SortBy, SortDirection } from '@project/enums';

export type TrainingKeys = keyof Training;

@Injectable()
export class TrainingRepository extends BaseMongoRepository<
  TrainingEntity,
  TrainingModel
> {
  constructor(
    entityFactory: TrainingFactory,
    @InjectModel(TrainingModel.name) trainingModel: Model<TrainingModel>
  ) {
    super(entityFactory, trainingModel);
  }

  public async findSpecialTrainings() {
    const trainings = await this.find({
      limit: DefaultTrainings.COUNT_LIMIT,
      specialOffer: true,
      sortBy: DefaultSort.BY,
      sortDirection: DefaultSort.DIRECTION,
    });

    return trainings.entities;
  }

  public async findPopularTrainings() {
    const trainings = await this.find({
      limit: DefaultTrainings.COUNT_LIMIT,
      sortBy: SortBy.rating,
      sortDirection: SortDirection.Desc,
    });

    return trainings.entities;
  }

  public async find(
    query: TrainingsQuery
  ): Promise<PaginationResult<TrainingEntity, TrainingsFilter>> {
    const skip =
      query?.page && query?.limit ? (query.page - 1) * query.limit : 0;
    const take = query?.limit || DefaultTrainings.COUNT_LIMIT;
    const currentPage = Number(query?.page) || DEFAULT_PAGE_COUNT;
    const filter: Partial<Record<TrainingKeys, unknown>> = {};

    if (query.trainingType) {
      filter.trainingType = query.trainingType;
    }
    if (query.level) {
      filter.level = query.level;
    }
    if (query.duration) {
      filter.duration = query.duration;
    }
    if (query.specialOffer) {
      filter.specialOffer = query.specialOffer;
    }

    const trainings = await this.model.find(
      filter,
      {},
      {
        limit: take,
        skip,
        sort: { [query.sortBy]: query.sortDirection },
      }
    );

    const aggregationResult: PriceAggregationResult[] =
      await this.model.aggregate([
        {
          $group: {
            _id: null,
            minPrice: { $min: '$price' },
            maxPrice: { $max: '$price' },
          },
        },
      ]);

    const { minPrice, maxPrice } = aggregationResult[0] || {};
    const trainingsCount = await this.model.countDocuments(filter);

    return {
      entities: trainings.map((el) => this.createEntityFromDocument(el)),
      currentPage,
      totalPages: this.calculateTrainingsPage(trainingsCount, take),
      itemsPerPage: take,
      totalItems: trainingsCount,
      filters: {
        price: { min: minPrice, max: maxPrice },
      },
    };
  }

  private calculateTrainingsPage(totalCount: number, limit: number): number {
    return Math.ceil(totalCount / limit);
  }
}
