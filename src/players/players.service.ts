import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PlayerResponseDto } from 'dto/player/playerresponse.dto';
import { PlayerQueryDto } from 'dto/player/playerquery.dto';
import { Model } from 'mongoose';
import { Player, PlayerDocument } from 'schemas/player.schema';
import { escapeRegExp, getRankedScore } from 'src/utils';
import { PassesService } from 'src/passes/passes.service';
import { LevelsService } from 'src/levels/levels.service';
import { Level } from 'schemas/level.schema';
import { Pass } from 'schemas/pass.schema';

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel('Player') private playerModel: Model<PlayerDocument>,    
    private readonly levelsService: LevelsService,
    private readonly passesService: PassesService,
  ) {}

  async insertPlayers(levels: Player[]): Promise<void> {
    await this.playerModel.insertMany(levels);
  }

  async deletePlayers(): Promise<void> {
    await this.playerModel.deleteMany({});
  }

  async findAll(): Promise<PlayerResponseDto> {
    const levelList = this.playerModel.find();

    let results: Player[] = await levelList.exec();
    const count = await this.playerModel.countDocuments(levelList.getQuery());

    const passes = await this.passesService.findAll().then(r => r.results);
    const levels = await this.levelsService.findAll().then(r => r.results);
    const newResults = await Promise.all(results.map(p => this.getDetailedData(p, passes, levels)));

    const returnObject = {
      count,
      results: newResults,
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

    let results = await levelList.exec();
    const count = await this.playerModel.countDocuments(levelList.getQuery());

    const passes = await this.passesService.findAll().then(r => r.results);
    const levels = await this.levelsService.findAll().then(r => r.results);
    const newResults = await Promise.all(results.map(p => this.getDetailedData(p, passes, levels)));

    const returnObject = {
      results: newResults,
      count,
    };
    return returnObject;
  }

  async getDetailedData(player: Player, passes: Pass[], levels: Level[]): Promise<Player> {
    const myPasses = passes.filter(p => p.player === player.name);

    if (!myPasses) return player;
    let newPlayer = player;
    newPlayer.totalPasses = myPasses.length;
    newPlayer.universalPasses = myPasses.filter(p => levels.find(l => l.id === p.levelId)?.pguDiff[0] === 'U').length;
    newPlayer.wfPasses = myPasses.filter(p => p.id === passes.filter(ap => ap.levelId === p.levelId).sort((a, b) => Date.parse(a.vidUploadTime) - Date.parse(b.vidUploadTime))[0].id).length;
    newPlayer.averageXacc = myPasses.map(p => p.accuracy).reduce((v, c) => v + c, 0) / myPasses.length;
    newPlayer.bestDiff = (myPasses.map(l=>levels.find(al=>al.id === l.levelId)) as Level[]).sort((a, b) => b.pdnDiff - a.pdnDiff)[0].pguDiff;
    const best12K = (myPasses.filter(p=>p.is12K).map(l=>levels.find(al => al.id === l.levelId)) as Level[]).sort((a, b) => b.pdnDiff - a.pdnDiff)[0];
    if (best12K) newPlayer.best12KDiff = best12K.pguDiff;
    newPlayer.generalScore = myPasses.map(p => p.scoreV2).filter(s=>!isNaN(+s)).reduce((a, v) => a + v, 0);
    console.log(myPasses.map(p => p.scoreV2).reduce((a, v) => a + v, 0))
    
    const scoreSortedPasses = myPasses.sort((a, b) => b.scoreV2 - a.scoreV2).map(p => p.scoreV2);
    newPlayer.rankedScore = getRankedScore(scoreSortedPasses);

    return newPlayer;
  }
};