import { OrdersEntity } from './orders.entity';
import { Injectable } from '@nestjs/common';
import {
  BaseMongoRepository,
  OrdersQuery,
  PaginationResult,
  DefaultSort,
  OrdersKeys,
  OrdersTrainerQuery,
} from '@project/core';
import { InjectModel } from '@nestjs/mongoose';
import { OrdersModel } from './orders.model';
import { OrdersFactory } from './orders.factory';
import { Model, Types } from 'mongoose';

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

  public async findByTrainerId(trainerId: string, query: OrdersTrainerQuery) {
    const skip =
      query?.page && query?.limit ? (query.page - 1) * query.limit : 0;
    const take = query?.limit;
    const currentPage = Number(query?.page) || 1;
    const trainerIdObj = new Types.ObjectId(trainerId);
    const aggregationPipeline = [
      // 1. Присоединяем коллекцию тренировок к заказам
      {
        $lookup: {
          from: 'trainings', // имя коллекции тренировок
          localField: 'trainingId',
          foreignField: '_id',
          as: 'training',
        },
      },

      // 3. Фильтруем только те заказы, где тренировки созданы нужным тренером

      {
        $match: {
          'training.trainerId': trainerIdObj,
        },
      },

      {
        $group: {
          _id: '$training._id',
          training: { $first: '$training' },
          totalSum: { $sum: '$totalSum' },
          totalCount: { $sum: '$quantity' },
        },
      },
      // 5. Сортируем, если указаны параметры сортировки
      // ...(query.sortBy
      //   ? [
      //       {
      //         $sort: {
      //           [query.sortBy]: query.sortDirection === 'desc' ? -1 : 1,
      //         },
      //       },
      //     ]
      //   : []),

      // 6. Пропускаем и ограничиваем данные для пагинации
      // { $skip: skip },
      // ...(take ? [{ $limit: take }] : []),
    ];

    const result = await this.model.aggregate(aggregationPipeline).exec();

    // Подсчет общего количества записей для пагинации
    const totalItemsPipeline = [
      {
        $lookup: {
          from: 'trainings',
          localField: 'trainingId',
          foreignField: '_id',
          as: 'training',
        },
      },
      { $unwind: '$training' },
      { $match: { 'training.trainerId': trainerIdObj } },
      { $group: { _id: '$trainingId' } }, // Считаем уникальные тренировки
      { $count: 'total' },
    ];
    const totalItemsResult = await this.model
      .aggregate(totalItemsPipeline)
      .exec();
    const totalItems = totalItemsResult[0]?.total || 0;

    return {
      entities: result,
      currentPage,
      totalPages: this.calculateOrdersPage(totalItems, take),
      itemsPerPage: take,
      totalItems,
    };
  }

  private calculateOrdersPage(totalCount: number, limit: number): number {
    return Math.ceil(totalCount / limit);
  }
}
