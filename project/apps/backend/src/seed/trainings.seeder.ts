import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TrainingModel } from '@project/trainings-module';
import { Seeder, DataFactory } from 'nestjs-seeder';
import { appConfig } from '@project/config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class TrainingsSeeder implements Seeder {
  constructor(
    @InjectModel(TrainingModel.name)
    private readonly training: Model<TrainingModel>,
    @Inject(appConfig.KEY)
    private readonly config: ConfigType<typeof appConfig>
  ) {}

  async seed() {
    await this.drop();

    const MOCK_TRAININGS_COUNT = 5;

    const trainings = DataFactory.createForClass(TrainingModel).generate(
      MOCK_TRAININGS_COUNT,
      {
        mockImagePath: `http://localhost:${this.config.port}/static/mock/`,
      }
    );

    return this.training.insertMany(trainings);
  }

  async drop() {
    return this.training.deleteMany({});
  }
}
