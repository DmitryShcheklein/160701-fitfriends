import { seeder } from 'nestjs-seeder';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from '@project/user-module';
import { UsersSeeder } from './seed/users.seeder';
import { AppConfigModule, getMongooseOptions } from '@project/config';
import { HasherModule } from '@project/hasher-module';
import { TrainingsSeeder } from './seed/trainings.seeder';
import { TrainingModel, TrainingSchema } from '@project/trainings-module';
import { CommentSeeder } from './seed/comment.seeder';
import { CommentModel, CommentSchema } from '@project/comments-module';
import { OrdersModel, OrdersSchema } from '@project/orders-module';
import { OrdersSeeder } from './seed/orders.seeder';
import { BalanceModel, BalanceSchema } from '@project/balance-module';
import { BalanceSeeder } from './seed/balance.seeder';

seeder({
  imports: [
    AppConfigModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
    MongooseModule.forFeature([
      { name: UserModel.name, schema: UserSchema },
      { name: TrainingModel.name, schema: TrainingSchema },
      { name: CommentModel.name, schema: CommentSchema },
      { name: OrdersModel.name, schema: OrdersSchema },
      { name: BalanceModel.name, schema: BalanceSchema },
    ]),
    HasherModule,
  ],
}).run([
  UsersSeeder,
  TrainingsSeeder,
  CommentSeeder,
  OrdersSeeder,
  BalanceSeeder,
]);
