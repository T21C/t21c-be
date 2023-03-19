import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { LevelsService } from '../levels/levels.service';
import { GsheetsService } from 'src/gsheets/gsheets.service';

@Injectable()
export class ScheduleService {
  constructor(
    private readonly gsheetsService: GsheetsService,
    private readonly levelsService: LevelsService,
  ) {}
  private readonly logger = new Logger(ScheduleService.name);

  @Cron(CronExpression.EVERY_10_MINUTES)
  async refreshDb() {
    this.logger.log('wow refreshing');
    const result = await this.gsheetsService.getDataFromSheets();
    try {
      await this.levelsService.deleteLevels();
      await this.levelsService.insertLevels(result);
    } catch (e) {
      return e;
    }
  }
}
