import { Injectable } from '@nestjs/common';
import { EntityFactory, Balance } from '@project/core';
import { BalanceEntity } from './balance.entity';

@Injectable()
export class BalanceFactory implements EntityFactory<BalanceEntity> {
  public create(entityPlainData: Balance): BalanceEntity {
    return new BalanceEntity(entityPlainData);
  }
}
