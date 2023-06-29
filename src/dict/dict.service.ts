import { Injectable } from '@nestjs/common';
import * as atcDict from 'atcDict.json';

@Injectable()
export class DictService {
  searchDict(query: any) {
    query = query.toLowerCase();
    console.log(atcDict);
    let content;
    try {
      content = atcDict[query as keyof object];
    } catch (e) {
      return null;
    }

    return content;
  }
}
