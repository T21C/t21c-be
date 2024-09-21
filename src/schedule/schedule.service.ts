import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { LevelsService } from '../levels/levels.service';
import { GsheetsService } from 'src/gsheets/gsheets.service';
import { PassesService } from 'src/passes/passes.service';
import { PlayersService } from 'src/players/players.service';

@Injectable()
export class ScheduleService {
  constructor(
    private readonly gsheetsService: GsheetsService,
    private readonly levelsService: LevelsService,
    private readonly passesService: PassesService,
    private readonly playersService: PlayersService,
  ) {}
  private readonly logger = new Logger(ScheduleService.name);

  @Cron('0 */15 * * * *')
  async refreshDb() {
    this.logger.log('wow refreshing');
    this.logger.log('Refreshing levels...');
    const levelsResult = await this.gsheetsService.getLevelsDataFromSheets();
    try {
      await this.levelsService.deleteLevels();
      await this.levelsService.insertLevels(levelsResult);
    } catch (e) {
      this.logger.error(e);
      return e;
    }

    this.logger.log('Refreshing passes...');
    const passesResult = await this.gsheetsService.getPassesDataFromSheets();
    try {
      await this.passesService.deletePasses();
      await this.passesService.insertPasses(passesResult);
    } catch (e) {
      this.logger.error(e);
      return e;
    }

    this.logger.log('Refreshing players...');
    const playersResult = await this.gsheetsService.getPlayersDataFromSheets();
    try {
      await this.playersService.deletePlayers();
      await this.playersService.insertPlayers(playersResult);
    } catch (e) {
      this.logger.error(e);
      return e;
    }

    this.logger.log('Refresh done.');
  }
}
