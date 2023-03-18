import { Controller, Get } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller('')
export class AppController {
  @Get()
  @ApiExcludeEndpoint()
  ping(): string {
    return 'Pong!';
  }
}
