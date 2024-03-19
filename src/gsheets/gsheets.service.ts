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
      [0, 1, 2, 14, 3, 4, 5, 16, 13, 6, 7, 8],
      [
        'id',
        'song',
        'artist',
        'creator',
        'charter',
        'vfxer',
        'team',
        'diff',
        'pgu_diff',
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
      [0, 2, 4, 5, 6],
      ['levelId', 'player', 'vidTitle', 'vidLink', 'vidUploadTime'],
      [7, 8, 9, 10, 11, 12, 13],
    );

    return result;
  }
}
