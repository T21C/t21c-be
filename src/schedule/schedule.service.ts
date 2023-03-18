import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { LevelsService } from '../levels/levels.service';
import { GsheetsService } from 'src/gsheets/gsheets.service';

@Injectable()
export class ScheduleService {
  constructor(
    private readonly gsheetsService: GsheetsService,
    private readonly levelsService: LevelsService,
  ) {}

  @Cron('* 10 * * *')
  async refreshDb() {
    const result = await this.gsheetsService.getDataFromSheets();
    try {
      await this.levelsService.deleteLevels();
      await this.levelsService.insertLevels(result);

      return 'Refresh done';
    } catch (e) {
      return e;
    }
  }
}
