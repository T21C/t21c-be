import {
  Query,
  Controller,
  Get,
  Post,
  UnauthorizedException,
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
import { PlayerDto } from 'dto/player/player.dto';
import { PlayerQueryDto } from 'dto/player/playerquery.dto';
import { GsheetsService } from '../gsheets/gsheets.service';
import { PlayersService } from './players.service';
import { TOKEN } from '../../config.json';

@ApiTags()
@Controller('players')
export class PlayersController {
  constructor(
    private readonly gsheetsService: GsheetsService,
    private readonly playersService: PlayersService,
  ) {}
  private readonly logger = new Logger(PlayersService.name);

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
    this.logger.log('Refreshing players...');

    const result = await this.gsheetsService.getPlayersDataFromSheets();
    try {
      await this.playersService.deletePlayers();
      await this.playersService.insertPlayers(result);

      this.logger.log('players refresh done');
      return 'Refresh done';
    } catch (e) {
      return e;
    }
  }

  @Get()
  @ApiOperation({
    summary: 'Gets a list of players',
    description:
      'Retrieves a list of all players, and search with query if any.',
  })
  @ApiTags('players')
  @ApiQuery({ name: 'query', description: 'Query to search', required: false })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: [PlayerDto],
  })
  async search(@Query() query: PlayerQueryDto) {
    if (Object.keys(query).length > 0) {
      return this.playersService.findByQuery(query);
    } else {
      return this.playersService.findAll();
    }
  }
}
