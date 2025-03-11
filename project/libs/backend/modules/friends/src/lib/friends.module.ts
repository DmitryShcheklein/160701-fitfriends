import { Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { FriendsRepository } from './friends.repository';
import { FriendFactory } from './friend.factory';
import { MongooseModule } from '@nestjs/mongoose';
import { FriendModel, FriendSchema } from './friend.model';
import { UserModule } from '@project/user-module';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([
      { name: FriendModel.name, schema: FriendSchema },
    ]),
  ],
  controllers: [FriendsController],
  providers: [FriendsService, FriendsRepository, FriendFactory],
})
export class FriendsModule {}
