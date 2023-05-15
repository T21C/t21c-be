import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UiPackSongDto {
  @ApiProperty({ example: 'Song 1' })
  title: string;

  @ApiProperty({ example: 'Author 1' })
  author: string;

  @ApiProperty({ example: 'Artist 1' })
  artist: string;

  @ApiPropertyOptional({ example: 215 })
  bpm?: number;

  @ApiProperty({ example: 'link/to/download' })
  download: string;

  @ApiPropertyOptional({ example: true })
  seizureWarning?: boolean;

  @ApiPropertyOptional({ example: 6578 })
  events?: number;

  @ApiPropertyOptional({ example: 3400 })
  tiles?: number;

  @ApiPropertyOptional({ example: 319 })
  duration?: number;

  @ApiPropertyOptional({ example: 'link/to/cover' })
  cover?: string;
}
