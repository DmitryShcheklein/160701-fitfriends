import { EntityFactory, Training } from '@project/core';
import { Injectable } from '@nestjs/common';
import { TrainingEntity } from './training.entity';

@Injectable()
export class TrainingFactory implements EntityFactory<TrainingEntity> {
  public create(entityPlainData: Training): TrainingEntity {
    return new TrainingEntity(entityPlainData);
  }
}
