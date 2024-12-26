import { Injectable } from '@nestjs/common';
import { BaseMongoRepository } from '@project/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FriendEntity } from './friend.entity';
import { FriendModel } from './friend.model';
import { FriendFactory } from './friend.factory';

@Injectable()
export class FriendsRepository extends BaseMongoRepository<
  FriendEntity,
  FriendModel
> {
  constructor(
    entityFactory: FriendFactory,
    @InjectModel(FriendModel.name) FriendModel: Model<FriendModel>
  ) {
    super(entityFactory, FriendModel);
  }
}
