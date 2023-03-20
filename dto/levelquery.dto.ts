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
}