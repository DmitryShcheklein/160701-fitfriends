import { seeder } from 'nestjs-seeder';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from '@project/user-module';
import { UsersSeeder } from './seed/users.seeder';
import { AppConfigModule, getMongooseOptions } from '@project/config';
import { HasherModule } from '@project/hasher-module';
import { TrainingsSeeder } from './seed/trainings.seeder';
import { TrainingModel, TrainingSchema } from '@project/trainings-module';
import { CommentSeeder } from './seed/comment.seeder';
import {
  CommentModel,
  CommentSchema,
} from 'libs/backend/modules/comments/src/lib/comment.model';

seeder({
  imports: [
    AppConfigModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
    MongooseModule.forFeature([
      { name: UserModel.name, schema: UserSchema },
      { name: TrainingModel.name, schema: TrainingSchema },
      { name: CommentModel.name, schema: CommentSchema },
    ]),
    HasherModule,
  ],
}).run([UsersSeeder, TrainingsSeeder, CommentSeeder]);
