import { Test, TestingModule } from '@nestjs/testing';
import { GsheetsService } from './gsheets.service';

describe('GSheets Service', () => {
  let service: GsheetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GsheetsService],
    }).compile();

    service = module.get<GsheetsService>(GsheetsService);
  });

  it('getLevelsDataFromSheets should return level data from sheets', async () => {
    await expect(service.getLevelsDataFromSheets()).toBeDefined();
  });
});
