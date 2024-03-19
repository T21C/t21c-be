import { Test, TestingModule } from '@nestjs/testing';
import { PassesService } from './passes.service';

describe('PassesService', () => {
  let service: PassesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PassesService],
    }).compile();

    service = module.get<PassesService>(PassesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
