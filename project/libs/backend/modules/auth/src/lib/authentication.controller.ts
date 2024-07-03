import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
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
import { ResponseMessage as UserResponseMessage } from '@project/user-module';
import { RequestWithUser } from './request-with-user.interface';
import { JwtRefreshGuard, LocalAuthGuard, JwtAuthGuard } from '@project/core';
import { AuthKeyName } from '@project/config';
import { RequestWithTokenPayload } from '@project/core';
import { CreateUserDto, LoginUserDto } from '@project/dto';
import { AuthenticationService } from './authentication.service';
import { LoggedUserRdo, RefreshUserRdo, RegisteredUserRdo } from '@project/rdo';
import { ALLOWED_IMG_MIMETYPES, User } from '@project/validation';
import { FileValidationPipe } from '@project/pipes';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('auth')
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @ApiCreatedResponse({
    type: RegisteredUserRdo,
    description: UserResponseMessage.UserCreated,
  })
  @ApiConsumes('multipart/form-data')
  @ApiConflictResponse({
    description: UserResponseMessage.UserExist,
    schema: generateSchemeApiError(
      UserResponseMessage.UserExist,
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
    @Body() dto: CreateUserDto,
    @UploadedFile(
      new FileValidationPipe(
        User.Avatar.FileMaxSize,
        ALLOWED_IMG_MIMETYPES,
        true
      )
    )
    file: Express.Multer.File
  ) {
    const newUser = await this.authService.register({
      ...dto,
      avatar: file,
    });
    const userToken = await this.authService.createUserToken(newUser);

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
    const userToken = await this.authService.createUserToken(user);

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
    return this.authService.createUserToken(user);
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
