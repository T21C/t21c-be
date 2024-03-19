import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UiPackDto } from 'dto/level/uipack.dto';
import { UiPackSongDto } from 'dto/level/uipacksong.dto';
import { LevelsService } from '../levels/levels.service';

@ApiTags()
@Controller('packui')
export class PackUiController {
  constructor(private readonly levelsService: LevelsService) {}

  @Get()
  @ApiOperation({
    summary: 'Gets a list of levels in PackUI format',
    description:
      'Retrieves a list of all levels, and returns it in PackUI format.',
  })
  @ApiTags('packui')
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: [UiPackDto],
  })
  async returnPackUI(): Promise<UiPackDto> {
    const packUiResponse: UiPackSongDto[] =
      await this.levelsService.findAllPackUI();
    const response: UiPackDto = {
      version: '1.0.0',
      title: 'T21C Pack',
      description: 'All levels in T21+C in one pack!',
      author: 'Various Creators (collected by the 21 Forums)',
      artist: 'Various Artists',
      difficulty: 9,
      songs: packUiResponse,
    };

    return response;
  }
}
