import { Controller, Get, Query } from '@nestjs/common';
import { DictService } from './dict.service';

@Controller('dict')
export class DictController {
  constructor(private readonly dictService: DictService) {}

  @Get()
  async searchDict(@Query() query: any) {
    return this.dictService.searchDict(query.q);
  }
}
