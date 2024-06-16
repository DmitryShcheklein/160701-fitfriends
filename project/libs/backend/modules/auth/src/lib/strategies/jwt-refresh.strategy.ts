import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigType } from '@nestjs/config';
import { jwtConfig } from '@project/config';
import { RefreshTokenPayload } from '@project/core';
import { RefreshTokenService } from '@project/refresh-token';
import { TokenNotExistsException } from '../exceptions/token-not-exists.exception';
import { AuthenticationService } from '../authentication.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh'
) {
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly userService: AuthenticationService,
    private readonly refreshTokenService: RefreshTokenService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtOptions.refreshTokenSecret,
    });
  }

  public async validate(payload: RefreshTokenPayload) {
    const { tokenId } = payload;

    const isExists = await this.refreshTokenService.isExists(tokenId);

    if (!isExists) {
      throw new TokenNotExistsException(tokenId);
    }

    await this.refreshTokenService.deleteRefreshSession(tokenId);
    await this.refreshTokenService.deleteExpiredRefreshTokens();

    return this.userService.getUserByEmail(payload.email);
  }
}
