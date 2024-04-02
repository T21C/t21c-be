import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LevelQueryDto } from 'dto/level/levelquery.dto';
import { LevelResponseDto } from 'dto/level/levelresponse.dto';
import { Model } from 'mongoose';
import { getRandomInt } from '../utils';
import { Level, LevelDocument } from 'schemas/level.schema';
import { shuffle } from 'shuffle-seed';
import { UiPackSongDto } from 'dto/level/uipacksong.dto';
import { escapeRegExp } from 'src/utils';

@Injectable()
export class LevelsService {
  constructor(@InjectModel('Level') private levelModel: Model<LevelDocument>) {}

  async insertLevels(levels: Level[]): Promise<void> {
    await this.levelModel.insertMany(levels);
  }

  async deleteLevels(): Promise<void> {
    await this.levelModel.deleteMany({});
  }

  async findAll(): Promise<LevelResponseDto> {
    const levelList = this.levelModel.find();

    const results = await levelList.exec();
    const count = await this.levelModel.countDocuments(levelList.getQuery());

    const returnObject = {
      count,
      results,
    };
    return returnObject;
  }

  async findByQuery(query: LevelQueryDto): Promise<LevelResponseDto> {
    const levelList = this.levelModel.find();

    if (query.query) {
      const queryRegex = new RegExp(escapeRegExp(query.query), 'i');
      levelList.and([
        {
          $or: [
            { song: queryRegex },
            { artist: queryRegex },
            { creator: queryRegex },
          ],
        },
      ]);
    }
    if (query.artistQuery) {
      const queryRegex = new RegExp(escapeRegExp(query.artistQuery), 'i');
      levelList.and([{ artist: queryRegex }]);
    }
    if (query.songQuery) {
      const queryRegex = new RegExp(escapeRegExp(query.songQuery), 'i');
      levelList.and([{ song: queryRegex }]);
    }
    if (query.creatorQuery) {
      const queryRegex = new RegExp(escapeRegExp(query.creatorQuery), 'i');
      levelList.and([{ creator: queryRegex }]);
    }

    let random = false;

    if (query.sort) {
      if (query.sort === 'RECENT_DESC') {
        levelList.sort({ id: 'desc' });
      }
      if (query.sort === 'RECENT_ASC') {
        levelList.sort({ id: 'asc' });
      }
      if (query.sort === 'DIFF_DESC') {
        levelList.sort({ pdnDiff: 'desc' });
      }
      if (query.sort === 'DIFF_ASC') {
        levelList.sort({ pdnDiff: 'asc' });
      }
      if (query.sort === 'RANDOM') {
        random = true;
      }
    } else {
      levelList.sort({ id: 'desc' });
    }

    if (random) {
      const seed =
        query.seed ||
        getRandomInt(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
      levelList.sort('id');
      const normalList = await levelList.exec();
      let shuffledList = shuffle(normalList, seed);

      if ('offset' in query) {
        shuffledList = shuffledList.slice(query.offset);
      }
      if ('limit' in query) {
        shuffledList = shuffledList.slice(0, query.limit);
      }

      const count = await this.levelModel.countDocuments(levelList.getQuery());
      const returnObject = {
        results: shuffledList,
        count,
      };
      return returnObject;
    } else {
      if ('offset' in query) {
        levelList.skip(query.offset);
      }
      if ('limit' in query) {
        levelList.limit(query.limit);
      }

      const results = await levelList.exec();
      const count = await this.levelModel.countDocuments(levelList.getQuery());

      const returnObject = {
        results,
        count,
      };
      return returnObject;
    }
  }

  async findById(id: number): Promise<Level | null> {
    return this.levelModel.findOne({ id: id }).exec();
  }

  async findAllPackUI(): Promise<UiPackSongDto[]> {
    const levelList = this.levelModel.find();
    const results = await levelList.exec();
    const resultObject = results.map((result) => result.toObject());
    console.log(results);

    let dlLink = '';
    const newResults = resultObject.map((level) => {
      const packUiLevel: UiPackSongDto = {
        title: '',
        author: '',
        artist: '',
        download: '',
      };
      Object.entries(level).forEach(([key, value]) => {
        switch (key) {
          case 'id':
            dlLink = `https://cdn.packui.net/content/t21c/${value}.zip`;
            break;
          case 'song':
            packUiLevel.title = value;
            break;
          case 'creator':
            packUiLevel.author = value;
            break;
          case 'artist':
            packUiLevel.artist = value;
            break;
          case 'dlLink':
            //            packUiLevel.download = value;
            //            break;
            packUiLevel.download = value !== '' ? dlLink : '';
            break;
        }
      });
      return packUiLevel;
    });

    return newResults;
  }
}
