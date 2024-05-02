import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassQueryDto } from 'dto/pass/passquery.dto';
import { PassResponseDto } from 'dto/pass/passresponse.dto';
import { Model } from 'mongoose';
import { Pass, PassDocument } from 'schemas/pass.schema';
import { escapeRegExp } from 'src/utils';

@Injectable()
export class PassesService {
  constructor(@InjectModel('Pass') private passModel: Model<PassDocument>) {}

  async insertPasses(passes: Pass[]): Promise<void> {
    await this.passModel.insertMany(passes);
  }

  async deletePasses(): Promise<void> {
    await this.passModel.deleteMany({});
  }

  async findAll(): Promise<PassResponseDto> {
    const passList = this.passModel.find();

    const results = await passList.exec();
    const count = await this.passModel.countDocuments(passList.getQuery());

    const returnObject = {
      count,
      results,
    };

    return returnObject;
  }

  async findByQuery(query: PassQueryDto): Promise<PassResponseDto | null> {
    const passList = this.passModel.find();

    if (query.id) {
      passList.and([{ levelId: query.levelId }]);
    }
    if (query.player) {
      const queryRegex = new RegExp(escapeRegExp(query.creatorQuery), 'i');
      passList.and([{ player: queryRegex }]);
    }

    const results = await passList.exec();
    const count = await this.passModel.countDocuments(passList.getQuery());

    const returnObject = {
      count,
      results,
    };

    return returnObject;
  }
}
