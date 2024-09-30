import { BalanceRepository } from './balance.repository';
import { TrainingService } from '@project/trainings-module';
import { Injectable } from '@nestjs/common';
import { BalanceFactory } from './balance.factory';
import { CreateBalanceDto } from '@project/dto';

@Injectable()
export class BalanceService {
  constructor(
    private readonly balanceFactory: BalanceFactory,
    private readonly balanceRepository: BalanceRepository,
    private readonly trainingService: TrainingService
  ) {}

  public async create({
    dto,
    userId,
    orderId,
  }: {
    dto: CreateBalanceDto;
    userId: string;
    orderId: string;
  }) {
    const training = (
      await this.trainingService.findById(dto.trainingId)
    ).toPOJO();

    const balanceEntity = this.balanceFactory.create({
      userId,
      orderId,
      isActive: true,
      trainingId: training.id,
      availableTrainings: Array.from({ length: dto.quantity }, () => ({
        isFinished: false,
        isStarted: false,
        dateStart: null,
        dateEnd: null,
      })),
    });

    return this.balanceRepository.save(balanceEntity);
  }
}
