import { ConflictException, Injectable } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { CommentEntity } from './comment.entity';
import { CreateCommentDto, UpdateCommentDto } from '@project/dto';

@Injectable()
export class CommentsService {
  constructor(private readonly commentsRepository: CommentRepository) {}

  public async create(
    trainingId: string,
    userId: string,
    dto: CreateCommentDto
  ) {
    const commentEntity = new CommentEntity({ ...dto, trainingId, userId });

    return this.commentsRepository.save(commentEntity);
  }

  public async findByTrainingId(trainingId: string) {
    return this.commentsRepository.find({ trainingId });
  }

  public async findAll() {
    return this.commentsRepository.find();
  }

  public async findOne(id: string) {
    return this.commentsRepository.findById(id);
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

    const newCommentEntity = new CommentEntity({
      ...existComment.toPOJO(),
      message: dto.message,
    });

    return this.commentsRepository.update(newCommentEntity);
  }

  public async remove(id: string) {
    return this.commentsRepository.deleteById(id);
  }
}
