import { BalanceRepository } from './balance.repository';
import { TrainingService } from '@project/trainings-module';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BalanceService {
  constructor(
    private readonly balanceRepository: BalanceRepository,
    private readonly trainingService: TrainingService
  ) {}
}
