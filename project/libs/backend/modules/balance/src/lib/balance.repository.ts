import { BalanceEntity } from './balance.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
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
  public async saveMany(entities: BalanceEntity[]) {
    const documents = await this.model.insertMany(entities);

    // return documents.map((el) => this.createEntityFromDocument(el));
  }
  public async findActiveBalancesByUserId(userId: string) {
    const documents = await this.model.find({ userId, isActive: true });

    return documents.map((el) => this.createEntityFromDocument(el));
  }

  public async findByTrainingIdAndUserId(userId: string, trainingId: string) {
    const documents = await this.model.find({ userId, trainingId });

    return documents.map((el) => this.createEntityFromDocument(el));
  }

  public async startTraining(userId: string, trainingId: string) {
    const document = await this.model.findOne({
      userId,
      trainingId,
      dateEnd: null,
    });

    if (!document) {
      throw new NotFoundException(`Not found active training 111`);
    }
    const entity = this.createEntityFromDocument(document);
    const balance = entity.toPOJO();
    console.log(balance);
    // const balance.availableTrainings.find((training)=>!training.isStarted && !training.isFinished)
  }
}
