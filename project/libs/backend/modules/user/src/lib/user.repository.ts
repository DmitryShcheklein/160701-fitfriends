import { Model } from 'mongoose';
import { UserEntity } from './user.entity';
import { UserFactory } from './user.factory';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserModel } from './user.model';
import {
  BaseMongoRepository,
  FriendsQuery,
  PaginationResult,
  UsersQuery,
} from '@project/core';
import { UserRole } from '@project/enums';
import { FriendEntity } from '../../../friends/src/lib/friend.entity';

@Injectable()
export class UserRepository extends BaseMongoRepository<UserEntity, UserModel> {
  constructor(
    entityFactory: UserFactory,
    @InjectModel(UserModel.name) userModel: Model<UserModel>
  ) {
    super(entityFactory, userModel);
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    const document = await this.model.findOne({ email }).exec();

    if (!document) return null;

    return this.createEntityFromDocument(document);
  }

  public async find(
    query: UsersQuery
  ): Promise<PaginationResult<UserEntity, void>> {
    const skip =
      query?.page && query?.limit ? (query.page - 1) * query.limit : 0;
    const take = query?.limit;
    const currentPage = Number(query?.page) || 1;

    const filter = {};

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
      .exec();

    const userCount = await this.model.countDocuments(filter);

    return {
      entities: friends.map((el) => this.createEntityFromDocument(el)),
      currentPage,
      totalPages: this.calculatePage(userCount, take),
      itemsPerPage: take,
      totalItems: userCount,
    };
  }

  private calculatePage(totalCount: number, limit: number): number {
    return Math.ceil(totalCount / limit);
  }
}
