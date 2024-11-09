import { ConflictException, Injectable } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { CreateCommentDto, UpdateCommentDto } from '@project/dto';
import { CommentFactory } from './comment.factory';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentsRepository: CommentRepository,
    private readonly commentsFactory: CommentFactory
  ) {}

  public async create(
    trainingId: string,
    userId: string,
    dto: CreateCommentDto
  ) {
    const commentEntity = this.commentsFactory.create({
      ...dto,
      trainingId,
      userId,
    });

    return this.commentsRepository.save(commentEntity);
  }

  public async findByTrainingId(trainingId: string) {
    return this.commentsRepository.find({ trainingId });
  }

  public async findAll() {
    return this.commentsRepository.find();
  }

  public async findOne(commentId: string) {
    return this.commentsRepository.findById(commentId);
  }

  public async update({
    userId,
    commentId,
    dto,
  }: {
    userId: string;
    commentId: string;
    dto: UpdateCommentDto;
  }) {
    const existComment = await this.commentsRepository.findById(commentId);
    const commentUserId = existComment.toPOJO().userId;

    if (commentUserId !== userId) {
      throw new ConflictException('Вы не можете изменять не свой комментарий');
    }

    const newCommentEntity = this.commentsFactory.create({
      ...existComment.toPOJO(),
      message: dto.message,
    });

    return this.commentsRepository.update(newCommentEntity);
  }

  public async remove(commentId: string) {
    return this.commentsRepository.deleteById(commentId);
  }
}
