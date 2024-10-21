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
    const { userId, orderId, trainingId } = dto;
    const balanceEntity = this.balanceFactory.create({
      userId,
      orderId,
      trainingId,
      isActive: true,
      availableTrainings: Array.from(Array(dto.quantity), () => ({
        isFinished: false,
        isStarted: false,
        dateStart: null,
        dateEnd: null,
      })),
    });

    return this.balanceRepository.save(balanceEntity);
  }

  public async findActiveBalancesByUserId(userId: string) {
    return this.balanceRepository.findActiveBalancesByUserId(userId);
  }

  public async getByTrainingIdandUserId(userId: string, trainingId: string) {
    return this.balanceRepository.findByTrainingIdAndUserId(userId, trainingId);
  }
}
