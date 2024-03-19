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
import { AppService } from '../app.service';
import { GsheetsService } from '../gsheets/gsheets.service';
import { PassesService } from './passes.service';
import { TOKEN } from '../../config.json';
import { PassDto } from 'dto/pass/pass.dto';

@ApiTags()
@Controller('passes')
export class PassesController {
  constructor(
    private readonly appService: AppService,
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
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: [PassDto],
  })
  async search() {
    return this.passesService.findAll();
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
    type: PassDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid ID',
  })
  async getPassesById(@Param('id', new ParseIntPipe()) id: number) {
    return await this.passesService.findById(id);
  }
}
