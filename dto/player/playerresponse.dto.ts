import { Player } from 'schemas/player.schema';

export class PlayerResponseDto {
  results: Player[];
  count: number;
}
