import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfigModule, getMongooseOptions } from '@project/config';
import { SwaggerService } from './services/swagger.service';
import { AuthenticationModule } from '@project/auth-module';
import { FileUploaderModule } from '@project/file-uploader';
import { TrainingModule } from '@project/trainings-module';

@Module({
  imports: [
    AppConfigModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
    AuthenticationModule,
    FileUploaderModule,
    TrainingModule,
  ],
  controllers: [],
  providers: [SwaggerService],
})
export class AppModule {}
