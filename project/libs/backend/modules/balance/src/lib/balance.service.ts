import { BalanceRepository } from './balance.repository';
import { Injectable } from '@nestjs/common';
import { BalanceFactory } from './balance.factory';
import { CreateBalanceDto } from '@project/dto';

@Injectable()
export class BalanceService {
  constructor(
    private readonly balanceFactory: BalanceFactory,
    private readonly balanceRepository: BalanceRepository
  ) {}

  public async create(dto: CreateBalanceDto) {
    const { userId, orderId, trainingId, quantity } = dto;

    const balanceEntities = Array.from(Array(quantity), () => this.balanceFactory.create({
      userId,
      orderId,
      trainingId,
    }));

    return this.balanceRepository.saveMany(balanceEntities);
  }

  public async findActiveBalancesByUserId(userId: string) {
    return this.balanceRepository.findActiveBalancesByUserId(userId);
  }

  public async getByTrainingIdandUserId(userId: string, trainingId: string) {
    return this.balanceRepository.findByTrainingIdAndUserId(userId, trainingId);
  }

  public async startTraining(userId: string, trainingId: string) {
    return this.balanceRepository.startTraining(userId, trainingId);
  }

  public async finishTraining(userId: string, trainingId: string) {
    return this.balanceRepository.finishTraining(userId, trainingId);
  }
}
