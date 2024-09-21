import { Injectable } from '@nestjs/common';
import { calculatePP, calculateXAcc, parseGViz } from 'src/utils';
import axios from 'axios';
import { Pass } from 'schemas/pass.schema';
import { LevelsService } from 'src/levels/levels.service';

@Injectable()
export class GsheetsService {
  constructor(private readonly levelsService: LevelsService) {}
  async getLevelsDataFromSheets() {
    const response: any = await axios.get(
      'https://spreadsheets.google.com/spreadsheets/d/1eaA1gyZ-6OWFthHFcVTfLV62U_MbpP6PHc8udN24iCg/gviz/tq?sheet=levels%20by%20dev',
    );
    const gvizStr: string = response.data;

    const result = await parseGViz(
      gvizStr,
      [
        0, 1, 2, 14, 3, 4, 5, 12, 12, 13, 17, 23, 18, 24, 19, 21, 20, 6, 7, 8,
        25,
      ],
      [
        'id',
        'song',
        'artist',
        'creator',
        'charter',
        'vfxer',
        'team',
        'diff',
        'legacyDiff',
        'pguDiff',
        'pguDiffNum',
        'newDiff',
        'pdnDiff',
        'realDiff',
        'baseScore',
        'isCleared',
        'clears',
        'vidLink',
        'dlLink',
        'workshopLink',
        'publicComments',
      ],
    );

    return result;
  }

  async getPassesDataFromSheets() {
    const response: any = await axios.get(
      'https://spreadsheets.google.com/spreadsheets/d/1eaA1gyZ-6OWFthHFcVTfLV62U_MbpP6PHc8udN24iCg/gviz/tq?sheet=passes%20by%20dev',
    );
    const gvizStr: string = response.data;

    const result: Pass[] = await parseGViz(
      gvizStr,
      [0, 1, 2, 3, 4, 5, 6, 7, 15, 16, 17],
      [
        'id',
        'levelId',
        'speed',
        'player',
        'feelingRating',
        'vidTitle',
        'vidLink',
        'vidUploadTime',
        'is12K',
        'isNoHoldTap',
        'isLegacyPass',
      ],
      [8, 9, 10, 11, 12, 13, 14],
    );

    const levelList = await this.levelsService.findAll();

    for (const pass of result) {
      if (pass.isLegacyPass)
        pass.accuracy = pass.judgements[0] === 1 ? 0.95 : 1;
      else {
        pass.accuracy = calculateXAcc(pass.judgements);
      }

      const level = levelList.results.find((l) => l.id === pass.levelId);
      if (!level) continue;
      const tileCount =
        pass.judgements[1] +
        pass.judgements[2] +
        pass.judgements[3] +
        pass.judgements[4] +
        pass.judgements[5];

      pass.scoreV2 = calculatePP(
        pass.accuracy * 100,
        pass.speed || 1,
        level.baseScore,
        level.diff === 64,
        tileCount,
        pass.judgements[0],
        pass.isNoHoldTap,
      );
    }

    return result;
  }

  async getPlayersDataFromSheets() {
    const response: any = await axios.get(
      'https://spreadsheets.google.com/spreadsheets/d/1eaA1gyZ-6OWFthHFcVTfLV62U_MbpP6PHc8udN24iCg/gviz/tq?sheet=players%20by%20dev',
    );
    const gvizStr: string = response.data;

    const result = await parseGViz(
      gvizStr,
      [6, 7, 8],
      ['name', 'country', 'isBanned'],
    );

    return result;
  }
}
