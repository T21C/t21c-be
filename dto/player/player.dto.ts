import { ApiProperty } from '@nestjs/swagger';

export class PlayerDto {
  @ApiProperty({ example: 'TEO_72' })
  player: string;

  @ApiProperty({ example: 'SG' })
  country: string;

  @ApiProperty({ example: false })
  isBanned: boolean;
}
