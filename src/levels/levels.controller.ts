import {
  Query,
  Controller,
  Get,
  Post,
  UnauthorizedException,
  NotFoundException,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { Level } from 'schemas/level.schema';
import { AppService } from '../app.service';
import { GsheetsService } from '../gsheets/gsheets.service';
import { LevelsService } from '../levels/levels.service';
import { TOKEN } from '../../config.json';

@Controller('levels')
export class LevelsController {
  constructor(
    private readonly appService: AppService,
    private readonly gsheetsService: GsheetsService,
    private readonly levelsService: LevelsService,
  ) {}

  @Post('refresh')
  async refresh(@Query() query: any) {
    if (query.token !== TOKEN) {
      throw new UnauthorizedException('Invalid token');
    }

    const result = await this.gsheetsService.getDataFromSheets();
    try {
      await this.levelsService.deleteLevels();
      await this.levelsService.insertLevels(result);

      return 'Refresh done';
    } catch (e) {
      return e;
    }
  }

  @Get()
  async search(@Query() query: any) {
    if (query.query !== null) {
      return this.levelsService.findByQuery(query.query);
    } else {
      return this.appService.findAll();
    }
  }

  @Get(':id')
  async getLevel(@Param('id', new ParseIntPipe()) id: number): Promise<Level> {
    const level = await this.levelsService.findById(id);
    if (level === null) {
      throw new NotFoundException('Level not found');
    } else {
      return level;
    }
  }
}
