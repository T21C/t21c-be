import {
  Query,
  Controller,
  Get,
  Post,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiExcludeEndpoint,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { GsheetsService } from '../gsheets/gsheets.service';
import { PassesService } from './passes.service';
import { TOKEN } from '../../config.json';
import { PassDto } from 'dto/pass/pass.dto';

@ApiTags()
@Controller('passes')
export class PassesController {
  constructor(
    private readonly gsheetsService: GsheetsService,
    private readonly passesService: PassesService,
  ) {}

  @ApiExcludeEndpoint()
  @Post('refresh')
  @ApiOperation({
    summary: 'Refreshes passes database',
    description:
      'Refreshes the passes database and syncs it with the main sheet.',
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

    const result = await this.gsheetsService.getPassesDataFromSheets();
    try {
      await this.passesService.deletePasses();
      await this.passesService.insertPasses(result);

      return 'Refresh done';
    } catch (e) {
      return e;
    }
  }

  @Get()
  @ApiOperation({
    summary: 'Gets a list of passes',
    description: 'Retrieves a list of all passes.',
  })
  @ApiTags('passes')
  @ApiQuery({
    name: 'levelId',
    description: 'Level ID to search passes for',
    required: false,
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: [PassDto],
  })
  async search(@Query() query: any) {
    if (Object.keys(query).length > 0) {
      if (!!query.levelId && isNaN(query.levelId))
        return new BadRequestException('Invalid level ID');
      return this.passesService.findByQuery(query);
    }
    return this.passesService.findAll();
  }
}
