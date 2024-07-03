import {
  ConflictException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Token, TokenPayload, User } from '@project/core';
import { ResponseMessage } from './authentication.constant';
import {
  ResponseMessage as UserResponseMessage,
  UserService,
} from '@project/user-module';
import { Hasher, HasherComponent } from '@project/hasher-module';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'node:crypto';
import { UserEntity } from '@project/user-module';
import { CreateUserDto, LoginUserDto } from '@project/dto';
import { FileUploaderService } from '@project/file-uploader';
import { Jwt } from '@project/config';
import { RefreshTokenService } from '@project/refresh-token';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UserService,
    @Inject(Jwt.ACCESS_KEY)
    private readonly jwtAccessService: JwtService,
    @Inject(Jwt.REFRESH_KEY)
    private readonly jwtRefreshService: JwtService,
    @Inject(HasherComponent.Service)
    private readonly hasherService: Hasher,
    private readonly refreshTokenService: RefreshTokenService,
    private readonly fileUploaderService: FileUploaderService
  ) {}

  public async register(dto: CreateUserDto): Promise<UserEntity> {
    const { email, password, avatar } = dto;
    const existUser = await this.userService.existUserByEmail(email);

    if (existUser) {
      throw new ConflictException(`${UserResponseMessage.UserExist}: ${email}`);
    }

    const passwordHash = await this.hasherService.generatePasswordHash(
      password
    );

    const avatarFile = (
      await this.fileUploaderService.saveFile(avatar)
    )?.toPOJO();

    const newUser = await this.userService.create({
      ...dto,
      passwordHash,
      avatarPath: avatarFile?.path,
    });

    return newUser;
  }

  public async verifyUser(dto: LoginUserDto) {
    const { email, password } = dto;
    const existUser = await this.userService.existUserByEmail(email);

    if (!existUser) {
      throw new UnauthorizedException(ResponseMessage.LoggedError);
    }

    const isEqualPassword = await this.hasherService.comparePassword({
      password,
      passwordHash: existUser.passwordHash,
    });

    if (!isEqualPassword) {
      throw new UnauthorizedException(ResponseMessage.LoggedError);
    }

    return existUser;
  }

  public async createUserToken({ id, email, firstname }: User): Promise<Token> {
    const accessTokenPayload: TokenPayload = {
      sub: String(id),
      email,
      firstname,
    };
    const refreshTokenPayload = {
      ...accessTokenPayload,
      tokenId: randomUUID(),
    };

    await this.refreshTokenService.createRefreshSession(refreshTokenPayload);

    try {
      const accessToken = await this.jwtAccessService.signAsync(
        accessTokenPayload
      );
      const refreshToken = await this.jwtRefreshService.signAsync(
        refreshTokenPayload
      );

      return { accessToken, refreshToken };
    } catch (error: any) {
      throw new HttpException(
        `Ошибка при создании токена: ${error?.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
