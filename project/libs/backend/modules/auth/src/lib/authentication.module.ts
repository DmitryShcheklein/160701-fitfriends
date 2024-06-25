import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { UserModule } from '@project/user-module';
import { MailModule } from '@project/mail-module';
import { HasherModule } from '@project/hasher-module';
import { RefreshTokenModule } from '@project/refresh-token';
import { JwtConfigModule } from '@project/config';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { UserController } from './authentication-user.controller';

@Module({
  imports: [
    UserModule,
    MailModule,
    RefreshTokenModule,
    HasherModule,
    JwtConfigModule.register(),
  ],
  controllers: [AuthenticationController, UserController],
  providers: [
    AuthenticationService,
    JwtAccessStrategy,
    JwtRefreshStrategy,
    LocalStrategy,
  ],
})
export class AuthenticationModule {}
