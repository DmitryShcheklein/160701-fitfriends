import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
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
import { UpdateUserDto } from '@project/dto';
import { UserRdo } from '@project/rdo';
import { AllowedMimetypes, UserValidation } from '@project/validation';
import { FileValidationPipe, MongoIdValidationPipe } from '@project/pipes';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard, RequestWithTokenPayload } from '@project/core';
import { UserService } from './user.service';
import { ResponseMessage } from './user.constant';

@ApiTags('user')
@Controller('user')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth(AuthKeyName)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Получить текущего пользователя',
  })
  @ApiOkResponse({
    type: UserRdo,
  })
  @Get()
  public async getUser(@Req() { user }: RequestWithTokenPayload) {
    const foundUser = await this.userService.getUserById(user.sub);

    return fillDto(UserRdo, foundUser);
  }

  @ApiOperation({
    summary: 'Получить данные пользователя по Id',
  })
  @ApiOkResponse({
    type: UserRdo,
  })
  @Get('/info/:userId')
  public async getUserById(
    @Param('userId', MongoIdValidationPipe) userId: string
  ) {
    const foundUser = await this.userService.getUserById(userId);

    return fillDto(UserRdo, foundUser);
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
  @Patch()
  public async updateUser(
    @Req() { user }: RequestWithTokenPayload,
    @Body() dto: UpdateUserDto,
    @UploadedFile(
      new FileValidationPipe(
        UserValidation.Avatar.FileMaxSize,
        AllowedMimetypes.Img,
        true
      )
    )
    file: Express.Multer.File | null
  ) {
    const updatedUser = await this.userService.updateUser(user.sub, {
      ...dto,
      avatar: file,
    });

    return fillDto(UserRdo, updatedUser);
  }
}
