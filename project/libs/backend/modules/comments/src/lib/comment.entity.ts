import { Entity, StorableEntity, Comment } from '@project/core';

export class CommentEntity extends Entity implements StorableEntity<Comment> {
  public createdAt?: Date;
  public updatedAt?: Date;
  public message!: string;
  public rating!: number;
  public trainingId!: string;
  public userId!: string;

  constructor(comment?: Comment) {
    super();
    this.populate(comment);
  }

  public populate(comment?: Comment) {
    if (!comment) {
      return;
    }

    this.id = comment.id;
    this.createdAt = comment.createdAt;
    this.updatedAt = comment.updatedAt;
    this.message = comment.message;
    this.trainingId = comment.trainingId;
    this.userId = comment.userId;
    this.rating = comment.rating;
  }

  public toPOJO(): Comment {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      message: this.message,
      trainingId: this.trainingId,
      userId: this.userId,
      rating: this.rating,
    };
  }
}
