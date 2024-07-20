import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { fillDto, generateSchemeApiError } from '@project/backend-helpers';
import { CreateCommentDto, UpdateCommentDto } from '@project/dto';
import { CommentRdo } from '@project/rdo';
import { AuthKeyName } from '@project/config';
import { JwtAuthGuard, RequestWithTokenPayload } from '@project/core';
import { MongoIdValidationPipe } from '@project/pipes';

@ApiTags('comments')
@Controller('trainings/:trainingId/comments')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth(AuthKeyName)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.CREATED,
    description: 'Comment create successfully',
  })
  @ApiOperation({
    summary: 'Создать комментарий',
    description: 'Create comment',
  })
  @Post()
  public async create(
    @Req() { user }: RequestWithTokenPayload,
    @Param('trainingId', MongoIdValidationPipe) trainingId: string,
    @Body() createCommentDto: CreateCommentDto
  ) {
    const userId = user.sub;
    const newComment = await this.commentsService.create(
      trainingId,
      userId,
      createCommentDto
    );

    return fillDto(CommentRdo, newComment.toPOJO());
  }

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.OK,
    description: 'Find comment by Id',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Comment not found',
    schema: generateSchemeApiError('Comment not found', HttpStatus.NOT_FOUND),
  })
  @ApiOperation({
    summary: 'Получить комментарий по id',
    description: 'Find comment by Id',
  })
  @Get(':commentId')
  public async findOne(@Param('commentId') commentId: string) {
    const existComment = await this.commentsService.findOne(commentId);

    return fillDto(CommentRdo, existComment.toPOJO());
  }

  @ApiResponse({
    isArray: true,
    type: CommentRdo,
    status: HttpStatus.OK,
    description: 'Find comments for Training',
  })
  @ApiOperation({
    summary: 'Получить все комментарии к тренировке по id',
    description: 'Find all comments by trainingId',
  })
  @Get()
  public async findBytrainingId(@Param('trainingId') trainingId: string) {
    const existComments = await this.commentsService.findByTrainingId(
      trainingId
    );

    return fillDto(
      CommentRdo,
      existComments.map((el) => el.toPOJO())
    );
  }

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.PARTIAL_CONTENT,
    description: 'Comment update successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Comment not found',
    schema: generateSchemeApiError('Comment not found', HttpStatus.NOT_FOUND),
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request data',
    schema: generateSchemeApiError('Bad request data', HttpStatus.BAD_REQUEST),
  })
  @ApiOperation({
    summary: 'Изменить комментарий',
    description: 'Fix comment by commentId',
  })
  @Patch(':commentId')
  public async update(
    @Req() { user }: RequestWithTokenPayload,
    @Param('commentId') commentId: string,
    @Body() dto: UpdateCommentDto
  ) {
    const userId = user.sub;
    const updatedComment = await this.commentsService.update({
      commentId,
      userId,
      dto,
    });

    return fillDto(CommentRdo, updatedComment.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Remove comment',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Comment not found',
    schema: generateSchemeApiError('Comment not found', HttpStatus.NOT_FOUND),
  })
  @ApiOperation({
    summary: 'Удалить комментарий',
    description: 'Remove comment',
  })
  @Delete(':commentId')
  public async remove(@Param('commentId') commentId: string) {
    return this.commentsService.remove(commentId);
  }
}
