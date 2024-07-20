import { ApiProperty } from '@nestjs/swagger';
import { Comment } from '@project/core';
import {
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsNumber,
  Min,
  Max,
} from 'class-validator';
import { CommentValidator } from '@project/validation';

export class CreateCommentDto
  implements Omit<Comment, 'createdAt' | 'updatedAt' | 'userId' | 'trainingId'>
{
  @ApiProperty({
    description: 'Comment message',
    example: 'Lorem ipsum'.repeat(10),
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(CommentValidator.Message.Min)
  @MaxLength(CommentValidator.Message.Max)
  public message!: string;

  @ApiProperty({
    description: 'Average rating of the training',
    example: 4,
    minimum: CommentValidator.Rating.Min,
    maximum: CommentValidator.Rating.Max,
  })
  @IsNumber()
  @Min(CommentValidator.Rating.Min)
  @Max(CommentValidator.Rating.Max)
  @IsNotEmpty()
  public rating!: number;
}
