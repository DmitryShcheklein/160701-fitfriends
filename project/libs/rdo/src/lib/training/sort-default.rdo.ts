import { ApiProperty } from '@nestjs/swagger';
import { SortBy, SortDirection } from '@project/enums';
import { Expose } from 'class-transformer';

export class SortDefaultRdo {
  @ApiProperty({
    description: 'Default Sort Direction',
    example: SortDirection.Asc,
  })
  @Expose()
  public DIRECTION: SortDirection;

  @ApiProperty({
    description: 'Default Sort By',
    example: SortBy.createdAt,
  })
  @Expose()
  public BY: SortBy;
}
