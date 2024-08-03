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

  @ApiPropertyOptional({ example: true })
  hideUnranked: boolean;

  @ApiPropertyOptional({ example: true })
  hideCensored: boolean;

  @ApiPropertyOptional({ example: true })
  hideEpic: boolean;

  @ApiPropertyOptional({ description: 'The minimum difficulty to display, in PGU number difficulty' })
  minDiff: number;

  @ApiPropertyOptional({ description: 'The maximum difficulty to display, in PGU number difficulty' })
  maxDiff: number;

  @ApiPropertyOptional({ example: 10 })
  offset: number;

  @ApiPropertyOptional({ example: 50 })
  limit: number;

  @ApiPropertyOptional({ example: false })
  random: boolean;

  @ApiPropertyOptional({
    enum: ['RECENT_ASC', 'RECENT_DESC', 'DIFF_ASC', 'DIFF_DESC', 'RANDOM'],
  })
  sort: string;

  @ApiPropertyOptional({ example: 1234 })
  seed: number;
}
