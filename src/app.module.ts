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

@Module({
  imports: [
    MongooseModule.forRoot(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedtopology: true,
    }),
    MongooseModule.forFeature([{ name: 'Level', schema: LevelSchema }]),
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController, LevelsController, PackUiController],
  providers: [AppService, GsheetsService, LevelsService, ScheduleService],
})
export class AppModule {}
