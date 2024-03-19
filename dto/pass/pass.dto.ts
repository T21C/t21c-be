import { ApiProperty } from '@nestjs/swagger';

export class PassDto {
  @ApiProperty({ example: 2773 })
  id: number;

  @ApiProperty({ example: 1 })
  levelId: number;

  @ApiProperty({ example: 'BWen' })
  player: string;

  @ApiProperty({ example: '최고의 플레이를 감상해주세요' })
  vidTitle: string;

  @ApiProperty({ example: 'https://youtu.be/WIYvSB7KFfE' })
  vidLink: string;

  @ApiProperty({ example: '2021-09-28T15:00:14Z' })
  vidUploadTime: string;
}
