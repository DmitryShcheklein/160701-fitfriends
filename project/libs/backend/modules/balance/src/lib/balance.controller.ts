import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard, RequestWithTokenPayload } from '@project/core';
import { AuthKeyName } from '@project/config';
import { MongoIdValidationPipe } from '@project/pipes';
import { BalanceService } from './balance.service';
import { BalanceRdo } from '@project/rdo';
import { fillDto } from '@project/backend-helpers';

@Controller('balance')
@ApiTags('balance')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth(AuthKeyName)
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @ApiOperation({
    summary: 'Получить тренинги',
  })
  @ApiOkResponse({
    isArray: true,
    type: BalanceRdo,
    description: 'Balance by trainingId',
  })
  @Get(':trainingId')
  public async getByTrainingId(
    @Param('trainingId', MongoIdValidationPipe) trainingId: string,
    @Req() { user }: RequestWithTokenPayload
  ) {
    const userId = user.sub;
    const trainings = await this.balanceService.getByTrainingIdandUserId(
      userId,
      trainingId
    );

    return fillDto(
      BalanceRdo,
      trainings.map((el) => el.toPOJO())
    );
  }

  @ApiOperation({
    summary: 'Приступить к тренировке',
  })
  @Post(':trainingId/start')
  public async startTraining(
    @Param('trainingId', MongoIdValidationPipe) trainingId: string,
    @Req() { user }: RequestWithTokenPayload
  ) {
    const userId = user.sub;

    const training = await this.balanceService.startTraining(
      userId,
      trainingId
    );

    return fillDto(BalanceRdo, training);
  }

  @ApiOperation({
    summary: 'Завершить тренировку',
  })
  @Post(':trainingId/finish')
  public async finishTraining(
    @Param('trainingId', MongoIdValidationPipe) trainingId: string,
    @Req() { user }: RequestWithTokenPayload
  ) {
    const userId = user.sub;

    const training = await this.balanceService.finishTraining(
      userId,
      trainingId
    );

    return fillDto(BalanceRdo, training);
  }
}
