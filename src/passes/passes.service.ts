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

    if (query.levelId) {
      passList.and([{ levelId: query.levelId }]);
    }
    if (query.player) {
      const queryRegex = new RegExp(escapeRegExp(query.player), 'i');
      passList.and([{ player: queryRegex }]);
    }

    let sortOther = false;

    if (query.sort) {
      switch (query.sort) {
        case 'SCORE_ASC':
          passList.sort({ scoreV2: 'asc' });
          break;
        case 'SCORE_DESC':
          passList.sort({ scoreV2: 'desc' });
          break;
        case 'XACC_ASC':
          passList.sort({ accuracy: 'asc' });
          break;
        case 'XACC_DESC':
          passList.sort({ accuracy: 'desc' });
          break;
        default:
          sortOther = true;
      }
    }

    const results = await passList.exec();
    const count = await this.passModel.countDocuments(passList.getQuery());

    if (sortOther) {
      switch (query.sort) {
        case 'DATE_ASC':
          results.sort((a, b) => Date.parse(a.vidUploadTime) - Date.parse(b.vidUploadTime));
          break;
        case 'DATE_DESC':
          results.sort((a, b) => Date.parse(b.vidUploadTime) - Date.parse(a.vidUploadTime));
          break;
      }
    }

    const returnObject = {
      count,
      results,
    };

    return returnObject;
  }
}
