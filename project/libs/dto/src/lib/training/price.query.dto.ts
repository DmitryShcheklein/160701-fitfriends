import { ApiProperty } from '@nestjs/swagger';
import { TrainingValidation } from '@project/validation';
import { Max, Min } from 'class-validator';

export class PriceQueryDto {
  @ApiProperty({
    description: 'Min price value',
    type: Number,
    required: false,
    example: TrainingValidation.Price.Min,
  })
  @Min(TrainingValidation.Price.Min)
  @Max(TrainingValidation.Price.Max)
  min: number;

  @ApiProperty({
    description: 'Max price value',
    type: Number,
    required: false,
    example: TrainingValidation.Price.Max,
  })
  @Min(TrainingValidation.Price.Min)
  @Max(TrainingValidation.Price.Max)
  max: number;
}
