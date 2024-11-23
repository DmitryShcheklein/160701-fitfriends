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
import { CommentValidation } from '@project/validation';

export class CreateCommentDto
  implements Omit<Comment, 'createdAt' | 'updatedAt' | 'userId' | 'trainingId'>
{
  @ApiProperty({
    description: 'Comment message',
    example: 'Lorem ipsum'.repeat(10),
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(CommentValidation.Message.Min)
  @MaxLength(CommentValidation.Message.Max)
  public message!: string;

  @ApiProperty({
    description: 'Average rating of the training',
    example: 4,
    minimum: CommentValidation.Rating.Min,
    maximum: CommentValidation.Rating.Max,
  })
  @IsNumber()
  @Min(CommentValidation.Rating.Min)
  @Max(CommentValidation.Rating.Max)
  @IsNotEmpty()
  public rating!: number;
}
