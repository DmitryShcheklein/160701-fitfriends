import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNumber } from 'class-validator';

export class CreateBalanceDto {
  @ApiProperty({
    required: true,
    description: 'Training id',
    example: '66b1236d1cbda17bfc97b45e',
  })
  @IsMongoId()
  trainingId: string;

  @ApiProperty({
    required: true,
    description: 'Training quantity',
    type: Number,
    example: 5,
  })
  @IsNumber()
  quantity: number;
}
