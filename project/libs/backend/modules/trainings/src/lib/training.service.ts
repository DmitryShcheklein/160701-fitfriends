import { Injectable } from '@nestjs/common';
import { TrainingRepository } from './training.repository';
import { TrainingFactory } from './training.factory';
import {
  PaginationResult,
  Training,
  TrainingsFilter,
  TrainingsQuery,
} from '@project/core';
import { CreateTrainingDto, UpdateTrainingDto } from '@project/dto';
import { TrainingEntity } from './training.entity';

@Injectable()
export class TrainingService {
  constructor(
    private readonly trainingRepository: TrainingRepository,
    private readonly trainingFactory: TrainingFactory
  ) {}

  public async create(dto: CreateTrainingDto) {
    const newTraining: Training = {
      ...dto,
    };
    const newTrainingEntity = this.trainingFactory.create(newTraining);

    return this.trainingRepository.save(newTrainingEntity);
  }

  public async findById(id: string) {
    return this.trainingRepository.findById(id);
  }

  public async getAllTrainings(
    query: TrainingsQuery
  ): Promise<PaginationResult<TrainingEntity, TrainingsFilter>> {
    return this.trainingRepository.find(query);
  }

  public async getSpecialTrainings() {
    return this.trainingRepository.findSpecialTrainings();
  }

  public async getPopularTrainings() {
    return this.trainingRepository.findPopularTrainings();
  }

  public async updateById(id: string, dto: UpdateTrainingDto) {
    const entity = await this.findById(id);
    const newEntity = this.trainingFactory.create({
      ...entity.toPOJO(),
      ...dto,
    });

    return this.trainingRepository.update(newEntity);
  }

  public async deleteById(id: string) {
    return this.trainingRepository.deleteById(id);
  }
}
