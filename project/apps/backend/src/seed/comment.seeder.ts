import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel } from '@project/user-module';
import { Seeder, DataFactory } from 'nestjs-seeder';
import { CommentModel } from '@project/comments-module';
import { TrainingModel } from '@project/trainings-module';

@Injectable()
export class CommentSeeder implements Seeder {
  private MOCK_COMMENT_COUNT = 50;

  constructor(
    @InjectModel(TrainingModel.name)
    private readonly trainingModel: Model<TrainingModel>,
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>,
    @InjectModel(CommentModel.name)
    private readonly commentModel: Model<CommentModel>
  ) {}

  async seed() {
    await this.drop();

    const userIds = (await this.userModel.find().select('_id')).map((user) =>
      user._id.toString()
    );

    const trainingIds = (await this.trainingModel.find().select('_id')).map(
      (training) => training._id.toString()
    );

    const comments = DataFactory.createForClass(CommentModel).generate(
      this.MOCK_COMMENT_COUNT,
      {
        userIds,
        trainingIds,
      }
    );

    return this.commentModel.insertMany(comments);
  }

  async drop() {
    return this.commentModel.deleteMany({});
  }
}
