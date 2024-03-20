import { ApiProperty } from '@nestjs/swagger';

export class LevelDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'multi_arm' })
  song: string;

  @ApiProperty({ example: 'Frums' })
  artist: string;

  @ApiProperty({ example: 'Zagon' })
  creator: string;

  @ApiProperty({ example: 'Random Charter' })
  charter: string;

  @ApiProperty({ example: 'Yet AnotherVFXer' })
  vfxer: string;

  @ApiProperty({ example: 'Team TUF' })
  team: string;

  @ApiProperty({ example: 21.05 })
  diff: number;

  @ApiProperty({ example: 'U1' })
  pgu_diff: string;

  @ApiProperty({ example: 21.09 })
  pgunum_diff: number;

  @ApiProperty({ example: 21.09 })
  pgn_diff: number;

  @ApiProperty({ example: 21 })
  forum: number;

  @ApiProperty({ example: 'https://youtu.be/tdig-B8QVKo' })
  vidLink: string;

  @ApiProperty({
    example:
      'https://drive.google.com/file/d/19aMDaDPd72D1U80gX5Fd-rPGkR4NjngP/view',
  })
  dlLink: string;

  @ApiProperty({
    example:
      'https://steamcommunity.com/sharedfiles/filedetails/?id=2556624480',
  })
  workshopLink: string;
}
