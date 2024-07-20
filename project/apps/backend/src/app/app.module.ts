import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfigModule, getMongooseOptions } from '@project/config';
import { SwaggerService } from './services/swagger.service';
import { AuthenticationModule } from '@project/auth-module';
import { FileUploaderModule } from '@project/file-uploader';
import { TrainingModule } from '@project/trainings-module';
import { CommentsModule } from '@project/comments-module';

@Module({
  imports: [
    AppConfigModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
    AuthenticationModule,
    FileUploaderModule,
    TrainingModule,
    CommentsModule,
  ],
  controllers: [],
  providers: [SwaggerService],
})
export class AppModule {}
