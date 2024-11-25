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
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { fillDto } from '@project/backend-helpers';
import {
  ApiBearerAuth,
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiConsumes,
} from '@nestjs/swagger';
import { JwtAuthGuard, RequestWithTokenPayload } from '@project/core';
import { TrainingService } from './training.service';
import { CreateTrainingDto, UpdateTrainingDto } from '@project/dto';
import { AuthKeyName } from '@project/config';
import { TrainingsQuery } from '@project/core';
import { FileValidationPipe, MongoIdValidationPipe } from '@project/pipes';
import { FileInterceptor } from '@nestjs/platform-express';
import { AllowedMimetypes, TrainingValidation } from '@project/validation';
import { API_BODY } from './training.const';
import { TrainingRdo, TrainingsWithPaginationRdo } from '@project/rdo';
import { Roles, RolesGuard } from '@project/guards';
import { UserRole } from '@project/enums';

@ApiTags('trainings')
@Controller('trainings')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth(AuthKeyName)
export class TrainingController {
  constructor(private readonly trainingService: TrainingService) {}

  @ApiOperation({
    summary: 'Получить тренинги',
  })
  @ApiOkResponse({
    type: TrainingsWithPaginationRdo,
  })
  @Get('/')
  public async showAll(@Query() query: TrainingsQuery) {
    const trainingsWithPagination = await this.trainingService.getAllTrainings(
      query
    );

    const result = {
      ...trainingsWithPagination,
      entities: trainingsWithPagination.entities.map((training) =>
        training.toPOJO()
      ),
    };

    return fillDto(TrainingsWithPaginationRdo, result);
  }

  @ApiOperation({
    summary: 'Получить рекоммендованные тренинги',
  })
  @ApiOkResponse({
    isArray: true,
    type: TrainingRdo,
  })
  @Roles(UserRole.User)
  @Get('/recommended')
  public async showRecommendedOffers(@Req() { user }: RequestWithTokenPayload) {
    const trainings = await this.trainingService.getRecommendedTrainings(
      user.email
    );

    return fillDto(
      TrainingRdo,
      trainings.map((el) => el.toPOJO())
    );
  }

  @ApiOperation({
    summary: 'Получить специальные тренинги',
  })
  @ApiOkResponse({
    isArray: true,
    type: TrainingRdo,
  })
  @Roles(UserRole.User)
  @Get('/special')
  public async showSpecialOffers() {
    const trainings = await this.trainingService.getSpecialTrainings();

    return fillDto(
      TrainingRdo,
      trainings.map((el) => el.toPOJO())
    );
  }

  @ApiOperation({
    summary: 'Получить популярные тренинги',
  })
  @ApiResponse({
    isArray: true,
    type: TrainingRdo,
    status: HttpStatus.OK,
  })
  @Roles(UserRole.User)
  @Get('/popular')
  public async showPopularOffers() {
    const trainings = await this.trainingService.getPopularTrainings();

    return fillDto(
      TrainingRdo,
      trainings.map((el) => el.toPOJO())
    );
  }

  @ApiCreatedResponse({
    type: TrainingRdo,
    description: 'Тренинг создан успешно',
  })
  @ApiOperation({
    summary: 'Создать тренинг',
  })
  @ApiConsumes('multipart/form-data')
  @Roles(UserRole.Trainer)
  @UseInterceptors(FileInterceptor('video'))
  @Post()
  public async create(
    @Req() { user }: RequestWithTokenPayload,
    @Body() dto: CreateTrainingDto,
    @UploadedFile(
      new FileValidationPipe(
        TrainingValidation.Video.FileMaxSize,
        AllowedMimetypes.Video,
        false
      )
    )
    file: Express.Multer.File
  ) {
    const userId = user.sub;

    const training = await this.trainingService.create(
      { ...dto, video: file },
      userId
    );

    return fillDto(TrainingRdo, training);
  }

  @ApiOperation({
    summary: 'Получить тренинг по id',
  })
  @ApiOkResponse({
    type: TrainingRdo,
  })
  @Get(':trainingId')
  public async show(
    @Param('trainingId', MongoIdValidationPipe) trainingId: string
  ) {
    const training = await this.trainingService.findById(trainingId);

    return fillDto(TrainingRdo, training);
  }

  @ApiOperation({
    summary: 'Обновить тренинг по id',
  })
  @ApiOkResponse({
    type: TrainingRdo,
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody(API_BODY.UpdateTraining)
  @UseInterceptors(FileInterceptor('video'))
  @Roles(UserRole.Trainer)
  @Patch(':trainingId')
  public async update(
    @Param('trainingId', MongoIdValidationPipe) trainingId: string,
    @Body() dto: UpdateTrainingDto,
    @UploadedFile(
      new FileValidationPipe(
        TrainingValidation.Video.FileMaxSize,
        AllowedMimetypes.Video,
        true
      )
    )
    file: Express.Multer.File
  ) {
    const updatedTraining = await this.trainingService.updateById(trainingId, {
      ...dto,
      video: file,
    });

    return fillDto(TrainingRdo, updatedTraining);
  }

  @ApiOperation({
    summary: 'Удалить тренинг по id',
  })
  @Roles(UserRole.Trainer)
  @Delete(':trainingId')
  public async delete(
    @Param('trainingId', MongoIdValidationPipe) trainingId: string
  ) {
    await this.trainingService.deleteById(trainingId);
  }
}
