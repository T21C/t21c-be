import { ApiPropertyOptional } from '@nestjs/swagger';

export class PassQueryDto {
  @ApiPropertyOptional({ example: '1' })
  levelId: string;

  @ApiPropertyOptional({ example: 'TEO' })
  player: string;
}
