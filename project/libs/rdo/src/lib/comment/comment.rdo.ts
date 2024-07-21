import { ApiProperty } from '@nestjs/swagger';
import { Comment } from '@project/core';
import { Expose } from 'class-transformer';
import { UserRdo } from '../user/user.rdo';

export class CommentRdo implements Omit<Comment, 'userId'> {
  @Expose()
  @ApiProperty({
    description: 'The uniq comment ID',
    example: '65b809b8d6443b043b33eedb',
  })
  public id!: string;

  @Expose()
  @ApiProperty({
    description: 'Comment message',
    example: 'Lorem ipsum',
  })
  public message!: string;

  @Expose()
  @ApiProperty({
    description: 'The uniq training ID',
    example: '65b80a0f61f1dff77ea2da3b',
  })
  public trainingId!: string;

  @Expose({ name: 'userId' })
  @ApiProperty({
    description: 'The uniq user ID',
    example: '65b80a917f56bfcfe7cb8729',
    type: UserRdo,
  })
  public user!: UserRdo;

  @Expose()
  @ApiProperty({
    description: 'Create comment date',
    example: '2024-01-11T14:19:59.298Z',
  })
  public createdAt!: Date;

  @Expose()
  @ApiProperty({
    description: 'Update comment date',
    example: '2024-01-11T14:19:59.298Z',
  })
  public updatedAt!: Date;

  @Expose()
  @ApiProperty({
    description: 'Comment Rating',
    example: 4,
  })
  public rating!: number;
}
