import { Pass } from 'schemas/pass.schema';

export class PassResponseDto {
  results: Pass[];
  count: number;
}
