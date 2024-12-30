import { Injectable } from '@nestjs/common';
import { FriendsRepository } from './friends.repository';
import { UserService } from '@project/user-module';
import { FriendsQuery } from '@project/core';

@Injectable()
export class FriendsService {
  constructor(
    private readonly friendsRepository: FriendsRepository,
    private readonly userService: UserService
  ) {}

  public async getUserFriends(userId: string, query: FriendsQuery) {
    return this.friendsRepository.find(userId, query);
  }

  public async findExistFriend(userId: string, friendId: string) {
    return this.friendsRepository.findExistFriend(userId, friendId);
  }
}
