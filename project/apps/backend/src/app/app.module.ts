import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfigModule, getMongooseOptions } from '@project/config';
import { SwaggerService } from './services/swagger.service';
import { AuthenticationModule } from '@project/auth-module';

@Module({
  imports: [
    AppConfigModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
    AuthenticationModule,
  ],
  controllers: [],
  providers: [SwaggerService],
})
export class AppModule {}
