import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { FriendsService } from './friends.service';
import {
  FriendsQuery,
  JwtAuthGuard,
  RequestWithTokenPayload,
} from '@project/core';
import { fillDto } from '@project/backend-helpers';
import { FriendsWithPaginationRdo } from '@project/rdo';
import { RolesGuard } from '@project/guards';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthKeyName } from '@project/config';

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

    const friendsWithPagination = await this.friendsService.getUserFriends(
      userId,
      query
    );

    const result = {
      ...friendsWithPagination,
      entities: friendsWithPagination.entities.map((training) =>
        training.toPOJO()
      ),
    };

    return fillDto(FriendsWithPaginationRdo, result);
  }
}
