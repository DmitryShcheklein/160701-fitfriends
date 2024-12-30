import { ConflictException, Injectable } from '@nestjs/common';
import { FriendsRepository } from './friends.repository';
import { UserService } from '@project/user-module';
import { FriendsQuery } from '@project/core';
import { FriendFactory } from './friend.factory';

@Injectable()
export class FriendsService {
  constructor(
    private readonly friendFactory: FriendFactory,
    private readonly friendsRepository: FriendsRepository
  ) {}

  public async getUserFriends(userId: string, query: FriendsQuery) {
    return this.friendsRepository.find(userId, query);
  }

  public async findExistFriend(userId: string, friendId: string) {
    return this.friendsRepository.findExistFriend(userId, friendId);
  }

  public async addFriend(userId: string, friendId: string) {
    const isExistFriend = await this.friendsRepository.findExistFriend(
      userId,
      friendId
    );

    if (isExistFriend) {
      throw new ConflictException('Пользователь уже у вас в друзьях');
    }

    if (userId === friendId) {
      throw new ConflictException('Вы не можете добавлять себя в друзья');
    }

    const newFriendEntity = this.friendFactory.create({
      userId,
      friendId,
    });

    return this.friendsRepository.save(newFriendEntity);
  }
}
