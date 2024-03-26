import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PlayerResponseDto } from 'dto/player/playerresponse.dto';
import { PlayerQueryDto } from 'dto/player/playerquery.dto';
import { Model } from 'mongoose';
import { Player, PlayerDocument } from 'schemas/player.schema';
import { escapeRegExp } from 'src/utils';

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel('Player') private playerModel: Model<PlayerDocument>,
  ) {}

  async insertPlayers(levels: Player[]): Promise<void> {
    await this.playerModel.insertMany(levels);
  }

  async deletePlayers(): Promise<void> {
    await this.playerModel.deleteMany({});
  }

  async findAll(): Promise<PlayerResponseDto> {
    const levelList = this.playerModel.find();

    const results = await levelList.exec();
    const count = await this.playerModel.countDocuments(levelList.getQuery());

    const returnObject = {
      count,
      results,
    };
    return returnObject;
  }

  async findByQuery(query: PlayerQueryDto): Promise<PlayerResponseDto> {
    const queryRegex = new RegExp(escapeRegExp(query.query), 'i');
    const levelList = this.playerModel.find({ name: queryRegex });

    if ('offset' in query) {
      levelList.skip(query.offset);
    }
    if ('limit' in query) {
      levelList.limit(query.limit);
    }

    const results = await levelList.exec();
    const count = await this.playerModel.countDocuments(levelList.getQuery());

    const returnObject = {
      results,
      count,
    };
    return returnObject;
  }
}
