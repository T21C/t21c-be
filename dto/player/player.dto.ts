import { ApiProperty } from '@nestjs/swagger';

export class PlayerDto {
  @ApiProperty({ example: 'TEO_72' })
  name: string;

  @ApiProperty({ example: 'SG' })
  country: string;

  @ApiProperty({ example: false })
  isBanned: boolean;
}
