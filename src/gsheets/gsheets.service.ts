import { Injectable } from '@nestjs/common';
import { parseGViz } from 'src/utils';
import axios from 'axios';
import { Pass } from 'schemas/pass.schema';

@Injectable()
export class GsheetsService {
  async getLevelsDataFromSheets() {
    const response: any = await axios.get(
      'https://spreadsheets.google.com/spreadsheets/d/1eaA1gyZ-6OWFthHFcVTfLV62U_MbpP6PHc8udN24iCg/gviz/tq?sheet=levels%20by%20dev',
    );
    const gvizStr: string = response.data;

    const result = await parseGViz(
      gvizStr,
      [0, 1, 2, 14, 3, 4, 5, 12, 13, 17, 18, 19, 6, 7, 8],
      [
        'id',
        'song',
        'artist',
        'creator',
        'charter',
        'vfxer',
        'team',
        'diff',
        'pguDiff',
        'pguDiffNum',
        'pdnDiff',
        'baseScore',
        'vidLink',
        'dlLink',
        'workshopLink',
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
      [0, 1, 2, 3, 5, 6, 7, 15, 16, 17],
      [
        'id',
        'levelId',
        'speed',
        'player',
        'vidTitle',
        'vidLink',
        'vidUploadTime',
        'is12K',
        'isNoHoldTap',
        'isLegacyPass',
      ],
      [8, 9, 10, 11, 12, 13, 14],
    );

    for (const pass of result) {
      if (pass.isLegacyPass)
        pass.accuracy = pass.judgements[0] === 1 ? 0.95 : 1;
      else {
        const judgements = pass.judgements;
        let total = 0;
        let weights = 0;
        for (let i = 0; i < judgements.length; i++) {
          total += judgements[i];
        }
        weights += judgements[0] * 20;
        weights += (judgements[1] + judgements[5]) * 40;
        weights += (judgements[2] + judgements[4]) * 75;
        weights += judgements[3] * 100;
        pass.accuracy = weights / total / 100;
      }
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
