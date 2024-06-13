import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfigModule } from './config/app-config.module';
import { getMongooseOptions } from './config/configurations/mongo/get-mongoose-options';
import { SwaggerService } from './services/swagger.service';

@Module({
  imports: [AppConfigModule, MongooseModule.forRootAsync(getMongooseOptions())],
  controllers: [],
  providers: [SwaggerService],
})
export class AppModule {}
