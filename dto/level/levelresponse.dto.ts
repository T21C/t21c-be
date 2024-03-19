import { Level } from 'schemas/level.schema';

export class LevelResponseDto {
  results: Level[];
  count: number;
}
