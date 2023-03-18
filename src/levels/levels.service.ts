import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
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

  async findByQuery(query: string): Promise<Level[]> {
    const queryRegex = new RegExp(query, 'i');
    return this.levelModel
      .find({
        $or: [
          { song: queryRegex },
          { artist: queryRegex },
          { creator: queryRegex },
        ],
      })
      .exec();
  }

  async findById(id: number): Promise<Level | null> {
    return this.levelModel.findOne({ id: id }).exec();
  }
}
