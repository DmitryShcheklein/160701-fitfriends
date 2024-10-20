import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Controller, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@project/core';
import { AuthKeyName } from '@project/config';

@Controller('balance')
@ApiTags('balance')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth(AuthKeyName)
export class BalanceController {}
