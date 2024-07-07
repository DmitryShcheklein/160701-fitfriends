import { Module } from '@nestjs/common';
import { TrainingRepository } from './training.repository';
import { TrainingFactory } from './training.factory';
import { MongooseModule } from '@nestjs/mongoose';
import { TrainingModel, TrainingSchema } from './training.model';
import { TrainingService } from './training.service';
import { TrainingController } from './training.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TrainingModel.name, schema: TrainingSchema },
    ]),
  ],
  controllers: [TrainingController],
  providers: [TrainingFactory, TrainingRepository, TrainingService],
  exports: [TrainingRepository],
})
export class TrainingModule {}
