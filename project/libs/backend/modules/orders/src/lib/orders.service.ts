import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { OrdersFactory } from './orders.factory';
import { CreateOrderDto } from '@project/dto';
import { Order } from '@project/core';
import { TrainingService } from '@project/trainings-module';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly ordersFactory: OrdersFactory,
    private readonly trainingService: TrainingService
  ) {}

  public async create(dto: CreateOrderDto, userId: string) {
    const training = (
      await this.trainingService.findById(dto.trainingId)
    ).toPOJO();

    const newOrder: Order = {
      ...dto,
      userId,
      type: 'абонемент',
      trainingPrice: training.price,
      totalSum: dto.quantity * training.price,
    };
    const newOrderEntity = this.ordersFactory.create(newOrder);

    return this.ordersRepository.save(newOrderEntity);
  }
}
