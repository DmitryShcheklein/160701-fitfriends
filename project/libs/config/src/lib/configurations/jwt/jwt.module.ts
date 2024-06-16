import { DynamicModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { getJwtOptions } from './get-jwt-options';
import { Jwt } from './jwt.const';

export class JwtConfigModule {
  static register(): DynamicModule {
    return {
      module: JwtConfigModule,
      providers: [
        {
          provide: Jwt.ACCESS_KEY,
          inject: [ConfigService],
          useFactory: (configService: ConfigService) =>
            new JwtService(getJwtOptions('access', configService)),
        },
        {
          provide: Jwt.REFRESH_KEY,
          inject: [ConfigService],
          useFactory: (configService: ConfigService) =>
            new JwtService(getJwtOptions('refresh', configService)),
        },
      ],
      exports: [Jwt.ACCESS_KEY, Jwt.REFRESH_KEY],
    };
  }
}
