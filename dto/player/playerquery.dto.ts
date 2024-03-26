import { ApiPropertyOptional } from '@nestjs/swagger';

export class PlayerQueryDto {
  @ApiPropertyOptional({ example: 'TEO' })
  query: string;

  @ApiPropertyOptional({ example: 10 })
  offset: number;

  @ApiPropertyOptional({ example: 50 })
  limit: number;
}
