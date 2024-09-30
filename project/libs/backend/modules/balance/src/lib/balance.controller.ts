import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard, RequestWithTokenPayload } from '@project/core';
import { AuthKeyName } from '@project/config';
import { BalanceService } from './balance.service';
import { CreateBalanceDto } from '@project/dto';

@Controller('balance')
@ApiTags('balance')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth(AuthKeyName)
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @ApiCreatedResponse({
    description: 'Balance created',
  })
  @ApiOperation({
    summary: 'Создать баланс тренировки',
    description: 'Create balance',
  })
  @Post()
  public async create(
    @Req() { user }: RequestWithTokenPayload,
    @Body() dto: CreateBalanceDto
  ) {
    const userId = user.sub;
    const balance = await this.balanceService.create({
      dto,
      userId,
      orderId: '66f829c19ac6d59eb2d21381',
    });

    return balance.toPOJO();
  }
}
