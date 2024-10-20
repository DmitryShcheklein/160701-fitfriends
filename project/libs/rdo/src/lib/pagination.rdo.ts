import { PaginationResult } from '@project/core';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationRdo implements Omit<PaginationResult, 'entities'> {
  @Expose()
  @ApiProperty({
    description: 'Общее количество страниц',
    example: 10,
  })
  public totalPages!: number;

  @Expose()
  @ApiProperty({
    description: 'Общее количество тренировок',
    example: 100,
  })
  public totalItems!: number;

  @Expose()
  @ApiProperty({
    description: 'Текущая страница',
    example: 1,
  })
  public currentPage!: number;

  @Expose()
  @ApiProperty({
    description: 'Количество элементов на странице',
    example: 20,
  })
  public itemsPerPage!: number;
}
