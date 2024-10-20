import { OrdersEntity } from './orders.entity';
import { Injectable } from '@nestjs/common';
import {
  BaseMongoRepository,
  OrdersQuery,
  PaginationResult,
  DefaultSort,
  OrdersKeys,
} from '@project/core';
import { InjectModel } from '@nestjs/mongoose';
import { OrdersModel } from './orders.model';
import { OrdersFactory } from './orders.factory';
import { Model } from 'mongoose';

@Injectable()
export class OrdersRepository extends BaseMongoRepository<
  OrdersEntity,
  OrdersModel
> {
  constructor(
    entityFactory: OrdersFactory,
    @InjectModel(OrdersModel.name) OrdersModel: Model<OrdersModel>
  ) {
    super(entityFactory, OrdersModel);
  }

  public async findByUserId(
    userId: string,
    query: OrdersQuery,
    activeTrainingIds?: string[]
  ): Promise<PaginationResult<OrdersEntity>> {
    const skip =
      query?.page && query?.limit ? (query.page - 1) * query.limit : 0;
    const take = query?.limit;
    const currentPage = Number(query?.page) || 1;

    const filter: Partial<Record<OrdersKeys, unknown>> = {
      userId,
    };

    if (query.isActive) {
      filter.trainingId = { $in: activeTrainingIds };
    }

    const orders = await this.model
      .find(
        filter,
        {},
        {
          limit: take,
          skip,
          sort: { [DefaultSort.BY]: query.sortDirection },
        }
      )
      .populate('trainingId')
      .exec();

    const ordersCount = await this.model.countDocuments(filter);

    return {
      entities: orders.map((el) => this.createEntityFromDocument(el)),
      currentPage,
      totalPages: this.calculateOrdersPage(ordersCount, take),
      itemsPerPage: take,
      totalItems: ordersCount,
    };
  }

  private calculateOrdersPage(totalCount: number, limit: number): number {
    return Math.ceil(totalCount / limit);
  }
}
