import { Injectable } from '@nestjs/common';
import { parseGViz } from 'src/utils';
import axios from 'axios';

@Injectable()
export class GsheetsService {
  async getDataFromSheets() {
    const response: any = await axios.get(
      'https://spreadsheets.google.com/spreadsheets/d/1eaA1gyZ-6OWFthHFcVTfLV62U_MbpP6PHc8udN24iCg/gviz/tq?sheet=Levels%20by%20ID',
    );
    const gvizStr: string = response.data;

    const result = await parseGViz(
      gvizStr,
      [0, 1, 2, 3, 6, 8, 10, 21, 22, 23],
      [
        'id',
        'song',
        'artist',
        'creator',
        'diff',
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
