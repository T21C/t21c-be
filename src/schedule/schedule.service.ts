import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { LevelsService } from '../levels/levels.service';
import { GsheetsService } from 'src/gsheets/gsheets.service';
import { PassesService } from 'src/passes/passes.service';

@Injectable()
export class ScheduleService {
  constructor(
    private readonly gsheetsService: GsheetsService,
    private readonly levelsService: LevelsService,
    private readonly passesService: PassesService,
  ) {}
  private readonly logger = new Logger(ScheduleService.name);

  @Cron(CronExpression.EVERY_10_MINUTES)
  async refreshDb() {
    this.logger.log('wow refreshing');
    const levelsResult = await this.gsheetsService.getLevelsDataFromSheets();
    try {
      await this.levelsService.deleteLevels();
      await this.levelsService.insertLevels(levelsResult);
    } catch (e) {
      return e;
    }

    const passesResult = await this.gsheetsService.getPassesDataFromSheets();
    try {
      await this.passesService.deletePasses();
      await this.passesService.insertPasses(passesResult);
    } catch (e) {
      return e;
    }
  }
}
