import { ApiProperty } from '@nestjs/swagger';
import { TrainingValidation } from '@project/validation';
import { Expose } from 'class-transformer';

export class PriceRdo {
  @ApiProperty({
    description: 'Min price value',
    type: Number,
    example: TrainingValidation.Price.Min,
  })
  @Expose()
  min: number;

  @ApiProperty({
    description: 'Max price value',
    type: Number,
    example: TrainingValidation.Price.Max,
  })
  @Expose()
  max: number;
}
