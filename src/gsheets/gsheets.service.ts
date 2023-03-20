import { Injectable } from '@nestjs/common';
import { parseGViz } from 'src/parseGViz';
import axios from 'axios';

@Injectable()
export class GsheetsService {
  async getDataFromSheets() {
    const response: any = await axios.get(
      'https://spreadsheets.google.com/spreadsheets/d/1eaA1gyZ-6OWFthHFcVTfLV62U_MbpP6PHc8udN24iCg/gviz/tq?&tq=SELECT%20*',
    );
    const gvizStr: string = response.data;

    const result = await parseGViz(
      gvizStr,
      [0, 1, 2, 3, 6, 7, 9, 11, 53, 54, 55],
      [
        'id',
        'song',
        'artist',
        'creator',
        'diff',
        'diffstrength',
        'feeling',
        'forum',
        'vidLink',
        'dlLink',
        'workshopLink',
      ],
    );

    return result;
  }
}