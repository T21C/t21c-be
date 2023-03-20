import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LevelQueryDto } from 'dto/levelquery.dto';
import { Model } from 'mongoose';
import { Level, LevelDocument } from 'schemas/level.schema';

@Injectable()
export class LevelsService {
  constructor(@InjectModel('Level') private levelModel: Model<LevelDocument>) {}

  async insertLevels(levels: Level[]): Promise<void> {
    await this.levelModel.insertMany(levels);
  }

  async deleteLevels(): Promise<void> {
    await this.levelModel.deleteMany({});
  }

  async findAll(): Promise<Level[]> {
    return this.levelModel.find().exec();
  }

  async findByQuery(query: LevelQueryDto): Promise<Level[]> {
    const levelList = this.levelModel.find();

    if (query.query) {
      const queryRegex = new RegExp(query.query, 'i');
      levelList.find({
        $or: [
          { song: queryRegex },
          { artist: queryRegex },
          { creator: queryRegex },
        ],
      });
    }
    if (query.artistQuery) {
      const queryRegex = new RegExp(query.artistQuery, 'i');
      levelList.find({ artist: queryRegex });
    }
    if (query.songQuery) {
      const queryRegex = new RegExp(query.songQuery, 'i');
      levelList.find({ song: queryRegex });
    }
    if (query.creatorQuery) {
      const queryRegex = new RegExp(query.creatorQuery, 'i');
      levelList.find({ creator: queryRegex });
    }

    return levelList.exec();
  }

  async findById(id: number): Promise<Level | null> {
    return this.levelModel.findOne({ id: id }).exec();
  }
}
