import { IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BaseQuery } from './base.query';
import { Transform } from 'class-transformer';

export class OrdersQuery extends BaseQuery {
  @ApiProperty({
    description: 'Show only active',
    example: false,
    required: false,
  })
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  @IsOptional()
  isActive: boolean;
}
