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
import { JwtAuthGuard } from '@project/core';
import { TrainingService } from './training.service';
import { CreateTrainingDto, UpdateTrainingDto } from '@project/dto';
import { AuthKeyName } from '@project/config';
import { TrainingsQuery } from '@project/core';
import { FileValidationPipe, MongoIdValidationPipe } from '@project/pipes';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploaderService } from '@project/file-uploader';
import { ALLOWED_IMG_MIMETYPES, TrainingValidation } from '@project/validation';
import { API_BODY } from './training.const';
// import { TrainingRdo, TrainingsWithPaginationRdo } from '@project/rdo';
const { TrainingRdo, TrainingsWithPaginationRdo } = {
  TrainingRdo: class TrainingRdo {},
  TrainingsWithPaginationRdo: class TrainingsWithPaginationRdo {},
};

@ApiTags('trainings')
@Controller('trainings')
export class TrainingController {
  constructor(
    private readonly trainingService: TrainingService,
    private readonly fileUploaderService: FileUploaderService
  ) {}

  @ApiCreatedResponse({
    type: TrainingRdo,
    description: 'Тренинг создан успешно',
  })
  @ApiOperation({
    summary: 'Создать тренинг',
  })
  @ApiBearerAuth(AuthKeyName)
  @UseGuards(JwtAuthGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody(API_BODY.CreateTraining)
  @UseInterceptors(FileInterceptor('video'))
  @Post()
  public async create(
    @Body() dto: CreateTrainingDto,
    @UploadedFile(
      new FileValidationPipe(
        TrainingValidation.Video.FileMaxSize,
        ALLOWED_IMG_MIMETYPES,
        true
      )
    )
    file: Express.Multer.File
  ) {
    const existFile = (await this.fileUploaderService.saveFile(file))?.toPOJO();
    const training = await this.trainingService.create({
      ...dto,
      video: existFile?.path,
    });

    return fillDto(TrainingRdo, training);
  }

  @ApiOperation({
    summary: 'Получить тренинги',
  })
  @ApiResponse({
    type: TrainingsWithPaginationRdo,
    status: HttpStatus.OK,
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
    summary: 'Получить тренинг по id',
  })
  @ApiOkResponse({
    type: TrainingRdo,
  })
  @ApiBearerAuth(AuthKeyName)
  @UseGuards(JwtAuthGuard)
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
  @ApiBearerAuth(AuthKeyName)
  @UseGuards(JwtAuthGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody(API_BODY.UpdateTraining)
  @UseInterceptors(FileInterceptor('video'))
  @Patch(':trainingId')
  public async update(
    @Param('trainingId', MongoIdValidationPipe) trainingId: string,
    @Body() dto: UpdateTrainingDto,
    @UploadedFile(
      new FileValidationPipe(
        TrainingValidation.Video.FileMaxSize,
        ALLOWED_IMG_MIMETYPES,
        true
      )
    )
    file: Express.Multer.File
  ) {
    const existFile = (await this.fileUploaderService.saveFile(file))?.toPOJO();
    const updatedTraining = await this.trainingService.updateById(trainingId, {
      ...dto,
      video: existFile?.path,
    });

    return fillDto(TrainingRdo, updatedTraining);
  }

  @ApiOperation({
    summary: 'Удалить тренинг по id',
  })
  @ApiBearerAuth(AuthKeyName)
  @UseGuards(JwtAuthGuard)
  @Delete(':trainingId')
  public async delete(
    @Param('trainingId', MongoIdValidationPipe) trainingId: string
  ) {
    await this.trainingService.deleteById(trainingId);
  }
}
