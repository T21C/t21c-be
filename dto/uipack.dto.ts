import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UiPackSongDto } from 'dto/uipacksong.dto';

export class UiPackDto {
  @ApiPropertyOptional({ example: 'link/to/schema' })
  $schema?: string;

  @ApiProperty({ example: '1.0.0' })
  version: string;

  @ApiProperty({ example: 'Example pack' })
  title: string;

  @ApiProperty({ example: 'Example response of the PackUI Download API' })
  description: string;

  @ApiProperty({ example: 'Example person' })
  author: string;

  @ApiProperty({ example: 'Various Artists' })
  artist: string;

  @ApiProperty({ example: '8' })
  difficulty: number;

  @ApiPropertyOptional({ example: '#FFFFFF' })
  color?: string;

  @ApiPropertyOptional({ example: '1684097000' })
  creationDate?: string;

  @ApiPropertyOptional({ example: '1684097000' })
  lastUpdate?: string;

  @ApiPropertyOptional({ example: 'link/to/cover' })
  cover?: string;

  @ApiPropertyOptional({ example: 'link/to/icon' })
  icon?: string;

  @ApiPropertyOptional()
  tags?: string[];

  @ApiProperty()
  songs: UiPackSongDto[];
}
