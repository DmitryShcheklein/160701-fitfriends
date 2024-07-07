import { seeder } from 'nestjs-seeder';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from '@project/user-module';
import { UsersSeeder } from './seed/users.seeder';
import { AppConfigModule, getMongooseOptions } from '@project/config';
import { HasherModule } from '@project/hasher-module';

seeder({
  imports: [
    AppConfigModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
    HasherModule,
  ],
}).run([UsersSeeder]);
