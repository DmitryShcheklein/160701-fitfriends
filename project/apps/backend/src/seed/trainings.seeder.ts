import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TrainingModel } from '@project/trainings-module';
import { Seeder, DataFactory } from 'nestjs-seeder';
import { appConfig } from '@project/config';
import { ConfigType } from '@nestjs/config';
import { UserModel } from '@project/user-module';
import { TrainingSeederData } from '@project/core';
import { AdminUser } from './seed.const';

@Injectable()
export class TrainingsSeeder implements Seeder {
  private MOCK_TRAININGS_COUNT = 15;

  constructor(
    @InjectModel(TrainingModel.name)
    private readonly training: Model<TrainingModel>,
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>,
    @Inject(appConfig.KEY)
    private readonly config: ConfigType<typeof appConfig>
  ) {}

  async seed() {
    await this.drop();

    const userIds = (
      await this.userModel.find({ email: AdminUser.email }).select('_id')
    ).map((user) => user._id.toString());

    const mockData: TrainingSeederData = {
      backgroundImages: Array.from(
        Array(4),
        (_, idx) => `training-${++idx}@2x.png`
      ),
      mockImagePath: `http://localhost:${this.config.port}/static/mock/`,
      videoLinks: [
        'https://assets.mixkit.co/videos/44442/44442-720.mp4',
        'https://assets.mixkit.co/videos/49276/49276-720.mp4',
        'https://assets.mixkit.co/videos/52092/52092-720.mp4',
        'https://assets.mixkit.co/videos/44414/44414-720.mp4',
        'https://assets.mixkit.co/videos/46688/46688-720.mp4',
      ],
      userIds,
    };

    const trainings = DataFactory.createForClass(TrainingModel).generate(
      this.MOCK_TRAININGS_COUNT,
      mockData
    );

    return this.training.insertMany(trainings);
  }

  async drop() {
    return this.training.deleteMany({});
  }
}
