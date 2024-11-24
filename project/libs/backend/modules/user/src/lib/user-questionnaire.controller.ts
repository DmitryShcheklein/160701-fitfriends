import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { fillDto, generateSchemeApiError } from '@project/backend-helpers';
import {
  ApiBearerAuth,
  ApiTags,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiOperation,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { AuthKeyName } from '@project/config';
import { CreateUserConfigDto, UpdateUserConfigDto } from '@project/dto';
import { UserConfigRdo } from '@project/rdo';
import { JwtAuthGuard, RequestWithTokenPayload } from '@project/core';
import { UserService } from './user.service';
import { ResponseMessage } from './user.constant';

@ApiTags('user')
@Controller('user/questionnaire/')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth(AuthKeyName)
export class UserQuestionnaireController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Создать опросник для пользователя',
  })
  @ApiCreatedResponse({
    type: UserConfigRdo,
    description: ResponseMessage.UserConfigCreated,
  })
  @ApiNotFoundResponse({
    description: ResponseMessage.UserNotFound,
  })
  @ApiBadRequestResponse({
    description: 'Bad request data',
    schema: generateSchemeApiError('Bad request data', HttpStatus.BAD_REQUEST),
  })
  @Post()
  public async createQuestionnaireUser(
    @Req() { user }: RequestWithTokenPayload,
    @Body() dto: CreateUserConfigDto
  ) {
    const newConfig = await this.userService.updateUserConfig(user.sub, dto);

    return fillDto(UserConfigRdo, newConfig);
  }

  @ApiOperation({
    summary: 'Обновить опросник для пользователя',
  })
  @ApiCreatedResponse({
    type: UserConfigRdo,
    description: ResponseMessage.UserConfigCreated,
  })
  @ApiNotFoundResponse({
    description: ResponseMessage.UserNotFound,
  })
  @ApiBadRequestResponse({
    description: 'Bad request data',
    schema: generateSchemeApiError('Bad request data', HttpStatus.BAD_REQUEST),
  })
  @Patch()
  public async updateQuestionnaireUser(
    @Req() { user }: RequestWithTokenPayload,
    @Body() dto: UpdateUserConfigDto
  ) {
    const updatedUser = await this.userService.updateUserConfig(user.sub, dto);

    return fillDto(UserConfigRdo, updatedUser.toPOJO().trainingConfig);
  }

  @ApiOperation({
    summary: 'Получить опросник для пользователя',
  })
  @ApiOkResponse({
    type: UserConfigRdo,
  })
  @ApiNotFoundResponse({
    description: ResponseMessage.UserNotFound,
  })
  @ApiBadRequestResponse({
    description: 'Bad request data',
    schema: generateSchemeApiError('Bad request data', HttpStatus.BAD_REQUEST),
  })
  @Get()
  public async getQuestionnaireUser(@Req() { user }: RequestWithTokenPayload) {
    const updatedUser = await this.userService.getUserById(user.sub);

    return fillDto(UserConfigRdo, updatedUser.toPOJO().trainingConfig);
  }
}
