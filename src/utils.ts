export async function parseGViz(
  gvizStr: string,
  includedColumns: number[],
  headerArray?: string[],
  judgements?: number[],
) {
  const match = gvizStr.match(/google.visualization.Query.setResponse\((.*)\)/);
  if (!match) {
    throw new Error('Failed to extract data from Google Sheets API response');
  }
  const jsonObject = JSON.parse(match[1]);
  let headers: string[];
  const includedRows = jsonObject.table.rows.filter(
    (row: any) => row.c[0] !== null,
  );

  if (headerArray) {
    headers = headerArray;
  } else {
    const headerRow = jsonObject.table.cols.filter((col: any, index: number) =>
      includedColumns.includes(index),
    );
    headers = headerRow.map((col: any) => col.label);
  }

  const data = includedRows.map((row: any) => {
    const rowData: { [key: string]: any } = {};
    includedColumns.forEach((index, i) => {
      const cell = row.c[index];
      rowData[headers[i]] = cell ? cell.v : '';
    });
    if (judgements) {
      const judgementArray: number[] = [];
      judgements.forEach((judgement) => {
        const cell = row.c[judgement];
        judgementArray.push(cell ? cell.v : '');
      });

      rowData['judgements'] = judgementArray;
    }
    return rowData;
  });

  return data;
}

export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomInt: number = Math.random();
  return Math.floor(randomInt * (max - min + 1) + min);
}

export function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function calculateXAcc(judgements: number[]) {
  let total = 0;
  let weights = 0;
  for (let i = 0; i < judgements.length; i++) {
    total += judgements[i];
  }
  weights += judgements[0] * 20;
  weights += (judgements[1] + judgements[5]) * 40;
  weights += (judgements[2] + judgements[4]) * 75;
  weights += judgements[3] * 100;
  return weights / total / 100;
}

export function calculatePP(
  xacc: number,
  speed = 1.0,
  baseScore: number,
  isDesertBus: boolean,
  tileCount: number,
  misses: number,
  isNoHoldTap: boolean,
) {
  const gmConst = 315;
  const start = 1;
  const end = 50;
  const startDeduc = 10;
  const endDeduc = 50;
  const pwr = 0.7;

  let xaccMtp = 0;
  let speedMtp = 0;
  let scorev2Mtp = 0;

  let score = 0;
  let scorev2 = 0;

  //get xacc multiplier
  if (xacc < 95) {
    xaccMtp = 1;
  } else if (xacc < 99) {
    xaccMtp = (xacc - 94) ** 1.6 / 12.1326 + 0.9176;
  } else if (xacc < 99.8) {
    xaccMtp = (xacc - 97) ** 1.5484 - 0.9249;
  } else if (xacc < 100) {
    xaccMtp = (xacc - 99) * 5;
  } else if (xacc == 100) {
    xaccMtp = 6;
  }

  //get speed multiplier
  if (isDesertBus) {
    if (speed == 1) {
      speedMtp = 1;
    } else if (speed > 1) {
      speedMtp = 2 - speed;
    }
  } else if (speed == 1) {
    speedMtp = 1;
  } else if (speed < 1) {
    speedMtp = 0;
  } else if (speed < 1.1) {
    speedMtp = 25 * (speed - 1.1) ** 2 + 0.75;
  } else if (speed < 1.2) {
    speedMtp = 0.75;
  } else if (speed < 1.25) {
    speedMtp = 50 * (speed - 1.2) ** 2 + 0.75;
  } else if (speed < 1.3) {
    speedMtp = -50 * (speed - 1.3) ** 2 + 1;
  } else if (speed < 1.5) {
    speedMtp = 1;
  } else if (speed < 1.75) {
    speedMtp = 2 * (speed - 1.5) ** 2 + 1;
  } else if (speed < 2) {
    speedMtp = -2 * (speed - 2) ** 2 + 1.25;
  } else {
    speedMtp = 0;
  }

  //get scorev2 multiplier
  if (misses == 0) {
    scorev2Mtp = 1.1;
  }

  let tp = (start + end) / 2;
  let tpDeduc = (startDeduc + endDeduc) / 2;
  let am = Math.max(0, misses - Math.floor(tileCount / gmConst));

  if (am <= 0) {
    scorev2Mtp = 1;
  } else if (am <= start) {
    scorev2Mtp = 1 - startDeduc / 100;
  } else if (am <= tp) {
    let kOne =
      (Math.pow((am - start) / (tp - start), pwr) * (tpDeduc - startDeduc)) /
      100;
    scorev2Mtp = 1 - startDeduc / 100 - kOne;
  } else if (am <= end) {
    const kTwo =
      (Math.pow((end - am) / (end - tp), pwr) * (endDeduc - tpDeduc)) / 100;
    scorev2Mtp = 1 - kTwo - endDeduc / 100;
  } else {
    scorev2Mtp = 1 - endDeduc / 100;
  }

  //get score
  score = Math.max(1, baseScore * xaccMtp * speedMtp);

  //get scorev2
  if (isNoHoldTap) {
    scorev2Mtp *= 0.9;
  }
  scorev2 = score * scorev2Mtp;

  return scorev2;
}

export function getRankedScore(scores: number[], top = 20) {
  if (scores.length < top) {
    top = scores.length;
  }

  let rankedScore = 0;
  for (let i = 0; i < top; i++) {
    rankedScore += 0.9 ** i * scores[i];
  }
  return rankedScore;
}
