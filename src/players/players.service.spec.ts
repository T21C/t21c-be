import { Test, TestingModule } from '@nestjs/testing';
import { PlayerService } from './players.service';

describe('PlayerService', () => {
  let service: PlayerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LevelsService],
    }).compile();

    service = module.get<LevelsService>(LevelsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
