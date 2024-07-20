import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CommentModel } from './comment.model';
import { BaseMongoRepository } from '@project/core';
import { CommentEntity } from './comment.entity';
import { CommentFactory } from './comment.factory';
import { MAX_COMMENT_LIMIT } from './comment.constant';

@Injectable()
export class CommentRepository extends BaseMongoRepository<
  CommentEntity,
  CommentModel
> {
  constructor(
    entityFactory: CommentFactory,
    @InjectModel(CommentModel.name) userModel: Model<CommentModel>
  ) {
    super(entityFactory, userModel);
  }

  public async find(query?: {
    trainingId?: string;
  }): Promise<CommentEntity[] | null> {
    const document = await this.model
      .find(query, {}, { limit: MAX_COMMENT_LIMIT })
      .exec();

    if (!document) return null;

    return document.map((document) => this.createEntityFromDocument(document));
  }
}
