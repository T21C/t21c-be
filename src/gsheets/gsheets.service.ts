import { Injectable } from '@nestjs/common';
import { parseGViz } from 'src/utils';
import axios from 'axios';

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

    const result = await parseGViz(
      gvizStr,
      [0, 1, 2, 3, 5, 6, 7, 15, 16],
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
      ],
      [8, 9, 10, 11, 12, 13, 14],
    );

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
