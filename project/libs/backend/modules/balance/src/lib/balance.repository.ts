import { BalanceEntity } from './balance.entity';
import { Injectable } from '@nestjs/common';
import { BaseMongoRepository } from '@project/core';
import { InjectModel } from '@nestjs/mongoose';
import { BalanceModel } from './balance.model';
import { BalanceFactory } from './balance.factory';
import { Model } from 'mongoose';

@Injectable()
export class BalanceRepository extends BaseMongoRepository<
  BalanceEntity,
  BalanceModel
> {
  constructor(
    entityFactory: BalanceFactory,
    @InjectModel(BalanceModel.name) BalanceModel: Model<BalanceModel>
  ) {
    super(entityFactory, BalanceModel);
  }
}
