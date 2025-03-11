import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FriendsService } from './friends.service';
import {
  FriendsQuery,
  JwtAuthGuard,
  RequestWithTokenPayload,
} from '@project/core';
import { fillDto } from '@project/backend-helpers';
import {
  FriendRdo,
  FriendStatusRdo,
  FriendsWithPaginationRdo,
} from '@project/rdo';
import { Roles, RolesGuard } from '@project/guards';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthKeyName } from '@project/config';
import { MongoIdValidationPipe } from '@project/pipes';
import { UserRole } from '@project/enums';

@ApiTags('friends')
@Controller('friends')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth(AuthKeyName)
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @ApiOperation({
    summary: 'Получить список друзей пользователя',
  })
  @ApiOkResponse({
    type: FriendsWithPaginationRdo,
  })
  @Get('/')
  public async getUserFriends(
    @Req() { user }: RequestWithTokenPayload,
    @Query() query: FriendsQuery
  ) {
    const userId = user.sub;
    const userRole = user.role;

    const friendsWithPagination = await this.friendsService.getUserFriends(
      userRole,
      userId,
      query
    );

    const result = {
      ...friendsWithPagination,
      entities: friendsWithPagination.entities.map((el) => {
        const item = el.toPOJO();

        return {
          id: item.id,
          friendId: userRole === UserRole.User ? item.friendId : item.userId,
        };
      }),
    };

    return fillDto(FriendsWithPaginationRdo, result);
  }

  @ApiOperation({
    summary: 'Проверить статус дружбы',
  })
  @ApiOkResponse({
    type: FriendStatusRdo,
  })
  @Get('/check/:friendId')
  public async findExistFriend(
    @Req() { user }: RequestWithTokenPayload,
    @Param('friendId', MongoIdValidationPipe) friendId: string
  ) {
    const userId = user.sub;
    const friend = await this.friendsService.findExistFriend(userId, friendId);

    return fillDto(FriendStatusRdo, {
      status: Boolean(friend),
    });
  }

  @Roles(UserRole.User)
  @ApiOperation({
    summary: 'Добавить в друзья',
  })
  @ApiCreatedResponse({
    type: FriendRdo,
  })
  @Post(':friendId')
  public async addFriend(
    @Req() { user }: RequestWithTokenPayload,
    @Param('friendId', MongoIdValidationPipe) friendId: string
  ) {
    const userId = user.sub;
    const friend = await this.friendsService.addFriend(userId, friendId);

    return fillDto(FriendRdo, friend);
  }

  @Roles(UserRole.User)
  @ApiOperation({
    summary: 'Удалить из друзей',
  })
  @ApiOkResponse({
    type: FriendRdo,
  })
  @Delete(':friendId')
  public async deleteFriend(
    @Req() { user }: RequestWithTokenPayload,
    @Param('friendId', MongoIdValidationPipe) friendId: string
  ) {
    const userId = user.sub;
    await this.friendsService.deleteFriend(userId, friendId);
  }
}
