import { Injectable } from '@nestjs/common';
import {
  BaseMongoRepository,
  FriendsQuery,
  PaginationResult,
} from '@project/core';
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

  public async find(
    userId: string,
    query: FriendsQuery
  ): Promise<PaginationResult<FriendEntity, void>> {
    const skip =
      query?.page && query?.limit ? (query.page - 1) * query.limit : 0;
    const take = query?.limit;
    const currentPage = Number(query?.page) || 1;
    const filter = { userId };

    const friends = await this.model
      .find(
        filter,
        {},
        {
          limit: take,
          skip,
          sort: { [query.sortBy]: query.sortDirection },
        }
      )
      .populate('friendId')
      .exec();

    const friendsCount = await this.model.countDocuments(filter);

    return {
      entities: friends.map((el) => this.createEntityFromDocument(el)),
      currentPage,
      totalPages: this.calculateTrainingsPage(friendsCount, take),
      itemsPerPage: take,
      totalItems: friendsCount,
    };
  }

  public async findExistFriend(userId: string, friendId: string) {
    const friend = await this.model.findOne({ userId, friendId }).exec();

    if (!friend) {
      return null;
    }

    return this.createEntityFromDocument(friend);
  }

  private calculateTrainingsPage(totalCount: number, limit: number): number {
    return Math.ceil(totalCount / limit);
  }
}
