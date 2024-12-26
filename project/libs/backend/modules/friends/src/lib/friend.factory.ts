import { Injectable } from '@nestjs/common';
import { EntityFactory, Friend } from '@project/core';
import { FriendEntity } from './friend.entity';

@Injectable()
export class FriendFactory implements EntityFactory<FriendEntity> {
  public create(entityPlainData: Friend): FriendEntity {
    return new FriendEntity(entityPlainData);
  }
}
