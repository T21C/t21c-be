import { ApiPropertyOptional } from '@nestjs/swagger';

export class PassQueryDto {
  @ApiPropertyOptional({ example: '1' })
  levelId?: string;

  @ApiPropertyOptional({ example: 'TEO' })
  player?: string;

  // todo: 'PDNDIFF_ASC', 'PDNDIFF_DESC'
  @ApiPropertyOptional({enum: ['SCORE_ASC', 'SCORE_DESC', 'XACC_ASC', 'XACC_DESC', 'DATE_ASC', 'DATE_DESC']})
  sort?: string;
}
