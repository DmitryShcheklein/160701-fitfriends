import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from './configurations/app.config';
import { mongoConfig } from './configurations/mongo/mongo.config';
import { jwtConfig } from './configurations/jwt/jwt.config';
import { mailConfig } from './configurations/mail/mail.config';
import { fileVaultConfig } from './configurations/file-vault/file-vault.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig, mongoConfig, jwtConfig, mailConfig, fileVaultConfig],
      envFilePath: 'apps/backend/.env',
    }),
  ],
})
export class AppConfigModule {}
