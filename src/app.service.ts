import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Level, LevelDocument } from 'schemas/level.schema';

@Injectable()
export class AppService {
  constructor(@InjectModel('Level') private levelModel: Model<LevelDocument>) {}

  async create(data: any): Promise<Level> {
    const createdData = new this.levelModel(data);
    return createdData.save();
  }

  async findAll(): Promise<Level[]> {
    return this.levelModel.find().exec();
  }
}
