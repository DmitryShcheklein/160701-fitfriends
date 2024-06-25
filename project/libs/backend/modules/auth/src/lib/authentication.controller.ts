import {
  Body,
  Controller,
  Get,
  HttpCode,
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
  ApiConflictResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiOperation,
  ApiConsumes,
} from '@nestjs/swagger';
import { ResponseMessage } from './authentication.constant';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RequestWithUser } from './request-with-user.interface';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { AuthKeyName } from '@project/config';
import { RequestWithTokenPayload } from '@project/core';
import { CreateUserDtoWithAvatarFile, LoginUserDto } from '@project/dto';
import { AuthenticationService } from './authentication.service';
import {
  LoggedUserRdo,
  RefreshUserRdo,
  RegisteredUserRdo,
  UserRdo,
} from '@project/rdo';
import { ALLOWED_IMG_MIMETYPES, User } from '@project/validation';
import { FileValidationPipe } from '@project/pipes';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('auth')
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly userService: AuthenticationService) {}

  @ApiCreatedResponse({
    type: UserRdo,
    description: ResponseMessage.UserCreated,
  })
  @ApiConsumes('multipart/form-data')
  @ApiConflictResponse({
    description: ResponseMessage.UserExist,
    schema: generateSchemeApiError(
      ResponseMessage.UserExist,
      HttpStatus.CONFLICT
    ),
  })
  @ApiBadRequestResponse({
    description: 'Bad request data',
    schema: generateSchemeApiError('Bad request data', HttpStatus.BAD_REQUEST),
  })
  @ApiOperation({
    summary: 'Регистрация',
  })
  @UseInterceptors(FileInterceptor('avatar'))
  @Post('register')
  public async create(
    @Body() dto: CreateUserDtoWithAvatarFile,
    @UploadedFile(
      new FileValidationPipe(
        User.Avatar.FileMaxSize,
        ALLOWED_IMG_MIMETYPES,
        true
      )
    )
    file: Express.Multer.File
  ) {
    const newUser = await this.userService.register({
      ...dto,
      avatar: file,
    });
    const userToken = await this.userService.createUserToken(newUser);

    return fillDto(RegisteredUserRdo, { ...newUser.toPOJO(), ...userToken });
  }

  @ApiOkResponse({
    type: LoggedUserRdo,
    description: ResponseMessage.LoggedSuccess,
  })
  @ApiUnauthorizedResponse({
    description: ResponseMessage.LoggedError,
    schema: generateSchemeApiError(
      ResponseMessage.LoggedError,
      HttpStatus.UNAUTHORIZED
    ),
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @ApiOperation({
    summary: 'Аутентификация',
  })
  @Post('login')
  public async login(
    @Req() { user }: RequestWithUser,
    @Body() _: LoginUserDto
  ) {
    const userToken = await this.userService.createUserToken(user);

    return fillDto(LoggedUserRdo, { ...user.toPOJO(), ...userToken });
  }

  @ApiBearerAuth(AuthKeyName)
  @ApiOkResponse({
    type: RefreshUserRdo,
    description: ResponseMessage.NewJWTTokensSuccess,
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtRefreshGuard)
  @ApiOperation({
    summary: 'Получение новой JWT пары',
  })
  @Post('refresh')
  public async refreshToken(@Req() { user }: RequestWithUser) {
    return this.userService.createUserToken(user);
  }

  @ApiOperation({
    summary: 'Проверка состояния пользователя',
  })
  @ApiBearerAuth(AuthKeyName)
  @UseGuards(JwtAuthGuard)
  @Get('check')
  public async checkToken(@Req() { user: payload }: RequestWithTokenPayload) {
    return payload;
  }
}
