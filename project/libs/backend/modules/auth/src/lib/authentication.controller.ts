import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
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
} from '@nestjs/swagger';
import { ResponseMessage } from './authentication.constant';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RequestWithUser } from './request-with-user.interface';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { AuthKeyName } from '@project/config';
import { RequestWithTokenPayload } from '@project/core';
import { CreateUserDto, LoginUserDto } from '@project/dto';
import { AuthenticationService } from './authentication.service';
import { LoggedUserRdo, RefreshUserRdo, UserRdo } from '@project/rdo';

@ApiTags('auth')
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly userService: AuthenticationService) {}

  @ApiCreatedResponse({
    type: UserRdo,
    description: ResponseMessage.UserCreated,
  })
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
  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.userService.register(dto);

    return fillDto(UserRdo, newUser.toPOJO());
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
