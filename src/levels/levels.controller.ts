import {
  Query,
  Controller,
  Get,
  Post,
  UnauthorizedException,
  NotFoundException,
  Param,
  ParseIntPipe,
  Logger,
} from '@nestjs/common';
import {
  ApiExcludeEndpoint,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { Level } from 'schemas/level.schema';
import { LevelDto } from 'dto/level/level.dto';
import { LevelQueryDto } from 'dto/level/levelquery.dto';
import { GsheetsService } from '../gsheets/gsheets.service';
import { LevelsService } from '../levels/levels.service';
import { TOKEN } from '../../config.json';

@ApiTags()
@Controller('levels')
export class LevelsController {
  constructor(
    private readonly gsheetsService: GsheetsService,
    private readonly levelsService: LevelsService,
  ) {}
  private readonly logger = new Logger(LevelsService.name);

  @ApiExcludeEndpoint()
  @Post('refresh')
  @ApiOperation({
    summary: 'Refreshes database',
    description: 'Refreshes the database and syncs it with the main sheet.',
  })
  @ApiSecurity('apiKey')
  @ApiResponse({
    status: 201,
    description: 'Success',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async refresh(@Query() query: any) {
    if (query.token !== TOKEN) {
      throw new UnauthorizedException('Invalid token');
    }

    this.logger.log('Refreshing levels...');
    const result = await this.gsheetsService.getLevelsDataFromSheets();
    try {
      await this.levelsService.deleteLevels();
      await this.levelsService.insertLevels(result);

      this.logger.log('levels refresh done');
      return 'Refresh done';
    } catch (e) {
      return e;
    }
  }

  @Get()
  @ApiOperation({
    summary: 'Gets a list of levels',
    description:
      'Retrieves a list of all levels, and search with query if any.',
  })
  @ApiTags('levels')
  @ApiQuery({ name: 'query', description: 'Query to search', required: false })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: [LevelDto],
  })
  async search(@Query() query: LevelQueryDto) {
    if (Object.keys(query).length > 0) {
      return this.levelsService.findByQuery(query);
    } else {
      return this.levelsService.findAll();
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Gets a level by ID',
    description: 'Searches a level by its ID, and returns it.',
  })
  @ApiTags('levels')
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: LevelDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid ID',
  })
  @ApiResponse({
    status: 404,
    description: 'Level not found',
  })
  async getLevel(@Param('id', new ParseIntPipe()) id: number): Promise<Level> {
    const level = await this.levelsService.findById(id);
    if (level === null) {
      throw new NotFoundException('Level not found');
    } else {
      return level;
    }
  }
}
