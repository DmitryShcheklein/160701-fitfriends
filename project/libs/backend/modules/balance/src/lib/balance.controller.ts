import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
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
}
