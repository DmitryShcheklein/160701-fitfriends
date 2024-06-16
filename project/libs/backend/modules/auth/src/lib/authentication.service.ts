import {
  ConflictException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthUser, Token, TokenPayload, User } from '@project/core';
import { ResponseMessage } from './authentication.constant';
import { Hasher, HasherComponent } from '@project/hasher-module';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'node:crypto';
import { UserRepository, UserEntity } from '@project/user-module';
import { CreateUserDtoWithAvatarFile, LoginUserDto } from '@project/dto';
import { FileUploaderService } from '@project/file-uploader';
import { Jwt } from '@project/config';
import { RefreshTokenService } from '@project/refresh-token';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userRepository: UserRepository,
    @Inject(Jwt.ACCESS_KEY)
    private readonly jwtAccessService: JwtService,
    @Inject(Jwt.REFRESH_KEY)
    private readonly jwtRefreshService: JwtService,
    @Inject(HasherComponent.Service)
    private readonly hasherService: Hasher,
    private readonly refreshTokenService: RefreshTokenService,
    private readonly fileUploaderService: FileUploaderService
  ) {}

  public async register(dto: CreateUserDtoWithAvatarFile): Promise<UserEntity> {
    const { email, firstname, password, avatar } = dto;
    const existUser = await this.userRepository.findByEmail(email);

    if (existUser) {
      throw new ConflictException(`${ResponseMessage.UserExist}: ${email}`);
    }

    const passwordHash = await this.hasherService.generatePasswordHash(
      password
    );
    const avatarFile = (
      await this.fileUploaderService.saveFile(avatar)
    )?.toPOJO();

    const newUser: AuthUser = {
      email,
      firstname,
      passwordHash,
      avatarPath: avatarFile.path,
    };

    const userEntity = new UserEntity(newUser);
    const newEntity = await this.userRepository.save(userEntity);

    return newEntity;
  }

  public async verifyUser(dto: LoginUserDto) {
    const { email, password } = dto;
    const existUser = await this.userRepository.findByEmail(email);

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

  public async getUserById(id: string) {
    const existUser = await this.userRepository.findById(id);

    if (!existUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return existUser;
  }

  public async getUserByEmail(email: string) {
    const existUser = await this.userRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(`User with email: ${email} not found`);
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
