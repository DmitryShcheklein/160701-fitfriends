import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { fillDto, generateSchemeApiError } from '@project/backend-helpers';
import {
  ApiBearerAuth,
  ApiTags,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiOperation,
  ApiConsumes,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { AuthKeyName } from '@project/config';
import { CreateUserConfigDto, UpdateUserDto } from '@project/dto';
import { UserRdo } from '@project/rdo';
import { ALLOWED_IMG_MIMETYPES, User } from '@project/validation';
import { FileValidationPipe } from '@project/pipes';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard, RequestWithTokenPayload } from '@project/core';
import { UserService } from './user.service';
import { ResponseMessage } from './user.constant';
import { UserConfigRdo } from 'libs/rdo/src/lib/user/user-config.rdo';

@ApiTags('user')
@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Получить пользователя',
  })
  @ApiOkResponse({
    type: UserRdo,
  })
  @ApiBearerAuth(AuthKeyName)
  @Get()
  public async getUser(@Req() { user }: RequestWithTokenPayload) {
    const findedUser = await this.userService.getUserById(user.sub);

    return fillDto(UserRdo, findedUser);
  }

  @ApiCreatedResponse({
    type: UserRdo,
    description: ResponseMessage.UserUpdated,
  })
  @ApiConsumes('multipart/form-data')
  @ApiNotFoundResponse({
    description: ResponseMessage.UserNotFound,
  })
  @ApiBadRequestResponse({
    description: 'Bad request data',
    schema: generateSchemeApiError('Bad request data', HttpStatus.BAD_REQUEST),
  })
  @ApiOperation({
    summary: 'Обновление пользователя',
  })
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiBearerAuth(AuthKeyName)
  @Patch()
  public async updateUser(
    @Req() { user }: RequestWithTokenPayload,
    @Body() dto: UpdateUserDto,
    @UploadedFile(
      new FileValidationPipe(
        User.Avatar.FileMaxSize,
        ALLOWED_IMG_MIMETYPES,
        true
      )
    )
    file: Express.Multer.File
  ) {
    const updatedUser = await this.userService.updateUser(user.sub, {
      ...dto,
      avatar: file,
    });

    return fillDto(UserRdo, updatedUser);
  }

  @ApiOperation({
    summary: 'Опросник для пользователя',
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
  @ApiBearerAuth(AuthKeyName)
  @Post('/questionnaire-user')
  public async questionnaireUser(
    @Req() { user }: RequestWithTokenPayload,
    @Body() dto: CreateUserConfigDto
  ) {
    const newConfig = await this.userService.createUserConfig(user.sub, dto);

    return fillDto(UserConfigRdo, newConfig);
  }
}
