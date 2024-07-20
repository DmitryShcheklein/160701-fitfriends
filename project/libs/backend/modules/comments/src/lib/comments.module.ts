import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { CommentRepository } from './comment.repository';
import { CommentFactory } from './comment.factory';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentModel, CommentSchema } from './comment.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CommentModel.name, schema: CommentSchema },
    ]),
  ],
  controllers: [CommentsController],
  providers: [CommentsService, CommentRepository, CommentFactory],
})
export class CommentsModule {}
