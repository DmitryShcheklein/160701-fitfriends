import { BalanceEntity } from './balance.entity';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    return this.model.insertMany(entities);
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
    const currentStartedTraining = await this.model.findOne({
      userId,
      trainingId,
      isStarted: true,
    });

    if (currentStartedTraining) {
      await this.finishTraining(userId, trainingId);
    }

    const document = await this.model.findOne({
      userId,
      trainingId,
      isStarted: false,
      isFinished: false,
    });

    if (!document) {
      throw new NotFoundException(
        `Not found not started training with TrainingId:${trainingId} for UserId:${userId}`
      );
    }
    document.dateStart = new Date();
    document.isStarted = true;

    await document.save();

    return this.createEntityFromDocument(document);
  }

  public async finishTraining(userId: string, trainingId: string) {
    const document = await this.model.findOne({
      userId,
      trainingId,
      isStarted: true,
      isFinished: false,
    });

    if (!document) {
      throw new NotFoundException(
        `Not found active training ${trainingId} for ${userId}`
      );
    }
    document.dateEnd = new Date();
    document.isFinished = true;
    document.isStarted = false;

    await document.save();

    return this.createEntityFromDocument(document);
  }
}
