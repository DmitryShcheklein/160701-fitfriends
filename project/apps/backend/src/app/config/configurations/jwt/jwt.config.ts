import { registerAs } from '@nestjs/config';
import { IsString } from 'class-validator';
import { configEnvValidator } from '../../lib/config-env-validator';
import { FromEnv } from '../../lib/from-env.decorator';

export class JwtDto {
  @IsString()
  @FromEnv('JWT_ACCESS_TOKEN_SECRET')
  public accessTokenSecret!: string;

  @IsString()
  @FromEnv('JWT_ACCESS_TOKEN_EXPIRES_IN')
  public accessTokenExpiresIn!: string;

  @IsString()
  @FromEnv('JWT_REFRESH_TOKEN_SECRET')
  public refreshTokenSecret!: string;

  @IsString()
  @FromEnv('JWT_REFRESH_TOKEN_EXPIRES_IN')
  public refreshTokenExpiresIn!: string;
}

export const jwtConfig = registerAs('jwt', configEnvValidator(JwtDto));
