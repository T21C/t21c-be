import { ApiPropertyOptional } from '@nestjs/swagger';

export class LevelQueryDto {
  @ApiPropertyOptional({ example: 'My Test Level' })
  query: string;

  @ApiPropertyOptional({ example: 'Frums' })
  artistQuery: string;

  @ApiPropertyOptional({ example: 'multi_arm' })
  songQuery: string;

  @ApiPropertyOptional({ example: 'Zagon' })
  creatorQuery: string;

  @ApiPropertyOptional({ example: 10 })
  offset: number;

  @ApiPropertyOptional({ example: 50 })
  limit: number;

  @ApiPropertyOptional({ example: false })
  random: boolean;

  @ApiPropertyOptional({ example: 1234 })
  seed: number;
}
