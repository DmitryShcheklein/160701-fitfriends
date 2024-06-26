import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Patch,
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
import { UpdateUserDto } from '@project/dto';
import { UserRdo } from '@project/rdo';
import { ALLOWED_IMG_MIMETYPES, User } from '@project/validation';
import { FileValidationPipe } from '@project/pipes';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard, RequestWithTokenPayload } from '@project/core';
import { UserService } from './user.service';
import { ResponseMessage } from './user.constant';

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
}
