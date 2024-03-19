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
      rowData['judgements'] = judgements.map((judgement) => row.c[judgement].v);
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
