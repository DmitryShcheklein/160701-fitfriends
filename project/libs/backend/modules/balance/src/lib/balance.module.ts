import { Module } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { BalanceController } from './balance.controller';
import { BalanceRepository } from './balance.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { BalanceModel, BalanceSchema } from './balance.model';
import { BalanceFactory } from './balance.factory';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: BalanceModel.name,
        schema: BalanceSchema,
      },
    ]),
  ],
  controllers: [BalanceController],
  providers: [BalanceService, BalanceRepository, BalanceFactory],
  exports: [BalanceService],
})
export class BalanceModule {}
