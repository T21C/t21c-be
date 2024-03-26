import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { LevelsController } from './levels/levels.controller';
import { AppService } from './app.service';
import { LevelSchema } from 'schemas/level.schema';
import { GsheetsService } from './gsheets/gsheets.service';
import { LevelsService } from './levels/levels.service';
import { ScheduleService } from './schedule/schedule.service';

import { MONGODB_URL } from '../config.json';
import { PackUiController } from './packui/packui.controller';
import { PassesService } from './passes/passes.service';
import { PassesController } from './passes/passes.controller';
import { PassSchema } from 'schemas/pass.schema';
import { PlayerSchema } from 'schemas/player.schema';
import { PlayersController } from './players/players.controller';
import { PlayersService } from './players/players.service';

@Module({
  imports: [
    MongooseModule.forRoot(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedtopology: true,
    }),
    MongooseModule.forFeature([{ name: 'Level', schema: LevelSchema }]),
    MongooseModule.forFeature([{ name: 'Pass', schema: PassSchema }]),
    MongooseModule.forFeature([{ name: 'Player', schema: PlayerSchema }]),
    ScheduleModule.forRoot(),
  ],
  controllers: [
    AppController,
    LevelsController,
    PassesController,
    PlayersController,
    PackUiController,
  ],
  providers: [
    AppService,
    GsheetsService,
    LevelsService,
    PassesService,
    PlayersService,
    ScheduleService,
  ],
})
export class AppModule {}
