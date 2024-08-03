import { ApiProperty } from '@nestjs/swagger';

export class PlayerDto {
  @ApiProperty({ example: 'TEO_72' })
  name: string;

  @ApiProperty({ example: 'SG' })
  country: string;

  @ApiProperty({ example: false })
  isBanned: boolean;

  rankedScore?: number;
  generalScore?: number;
  averageXacc?: number;
  totalPasses?: number;
  universalPasses?: number;
  wfPasses?: number;
  bestDiff?: string;
  best12KDiff?: string;
}
