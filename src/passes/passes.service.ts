import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassResponseDto } from 'dto/pass/passresponse.dto';
import { Model } from 'mongoose';
import { Pass, PassDocument } from 'schemas/pass.schema';

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

  async findById(id: number): Promise<PassResponseDto | null> {
    const passList = this.passModel.find({ levelId: id });

    const results = await passList.exec();
    const count = await this.passModel.countDocuments(passList.getQuery());

    const returnObject = {
      count,
      results,
    };

    return returnObject;
  }
}
