import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { OrdersFactory } from './orders.factory';
import { CreateOrderDto } from '@project/dto';
import { TrainingService } from '@project/trainings-module';
import { BalanceService } from '@project/balance-module';
import { OrdersQuery } from '@project/core';
import { ObjectId } from 'mongodb';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly ordersFactory: OrdersFactory,
    private readonly trainingService: TrainingService,
    private readonly balanceService: BalanceService
  ) {}

  public async create(dto: CreateOrderDto, userId: string) {
    const training = (
      await this.trainingService.findById(dto.trainingId)
    ).toPOJO();

    const newOrderEntity = this.ordersFactory.create({
      ...dto,
      userId,
      type: 'абонемент',
      trainingPrice: training.price,
      totalSum: dto.quantity * training.price,
    });

    const newOrder = await this.ordersRepository.save(newOrderEntity);
    const orderId = newOrder.toPOJO().id;

    await this.balanceService.create({
      userId,
      orderId,
      trainingId: training.id,
      quantity: dto.quantity,
    });

    return newOrder;
  }

  public async findByUserId(userId: string, query: OrdersQuery) {
    const activeTrainingsIds = [];
    if (query.isActive) {
      const activeBalances =
        await this.balanceService.findActiveBalancesByUserId(userId);

      activeBalances.forEach((balance) => {
        const { trainingId } = balance.toPOJO();

        activeTrainingsIds.push(trainingId);
      });
    }

    return this.ordersRepository.findByUserId(
      userId,
      query,
      activeTrainingsIds
    );
  }
}
