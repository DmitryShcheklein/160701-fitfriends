import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { fillDto } from '@project/backend-helpers';
import {
  ApiBearerAuth,
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard, RequestWithTokenPayload } from '@project/core';
import { ReviewService } from './review.service';
import { CreateReviewDto, UpdateReviewDto } from '@project/dto';
import { AuthKeyName } from '@project/config';
import { ReviewsQuery } from '@project/core';
import { MongoIdValidationPipe } from '@project/pipes';
import { ReviewRdo, ReviewsWithPaginationRdo } from '@project/rdo';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @ApiCreatedResponse({
    type: ReviewRdo,
    description: 'Отзыв создан успешно',
  })
  @ApiOperation({
    summary: 'Создать отзыв',
  })
  @ApiBearerAuth(AuthKeyName)
  @UseGuards(JwtAuthGuard)
  @Post()
  public async create(
    @Body() dto: CreateReviewDto,
    @Req() { user }: RequestWithTokenPayload
  ) {
    const review = await this.reviewService.create({
      ...dto,
      author: user.id,
    });

    return fillDto(ReviewRdo, review);
  }

  @ApiOperation({
    summary: 'Получить отзывы',
  })
  @ApiResponse({
    type: ReviewsWithPaginationRdo,
    status: HttpStatus.OK,
  })
  @ApiBearerAuth(AuthKeyName)
  @UseGuards(JwtAuthGuard)
  @Get('/')
  public async showAll(@Query() query: ReviewsQuery) {
    const reviewsWithPagination = await this.reviewService.getAllReviews(query);

    const result = {
      ...reviewsWithPagination,
      entities: reviewsWithPagination.entities.map((review) => review.toPOJO()),
    };

    return fillDto(ReviewsWithPaginationRdo, result);
  }

  @ApiOperation({
    summary: 'Получить отзыв по id',
  })
  @ApiOkResponse({
    type: ReviewRdo,
  })
  @ApiBearerAuth(AuthKeyName)
  @UseGuards(JwtAuthGuard)
  @Get(':reviewId')
  public async show(
    @Param('reviewId', MongoIdValidationPipe) reviewId: string
  ) {
    const review = await this.reviewService.findById(reviewId);

    return fillDto(ReviewRdo, review);
  }

  @ApiOperation({
    summary: 'Обновить отзыв по id',
  })
  @ApiOkResponse({
    type: ReviewRdo,
  })
  @ApiBearerAuth(AuthKeyName)
  @UseGuards(JwtAuthGuard)
  @Patch(':reviewId')
  public async update(
    @Param('reviewId', MongoIdValidationPipe) reviewId: string,
    @Body() dto: UpdateReviewDto
  ) {
    const updatedReview = await this.reviewService.updateById(reviewId, dto);

    return fillDto(ReviewRdo, updatedReview);
  }

  @ApiOperation({
    summary: 'Удалить отзыв по id',
  })
  @ApiBearerAuth(AuthKeyName)
  @UseGuards(JwtAuthGuard)
  @Delete(':reviewId')
  public async delete(
    @Param('reviewId', MongoIdValidationPipe) reviewId: string
  ) {
    await this.reviewService.deleteById(reviewId);
  }
}
