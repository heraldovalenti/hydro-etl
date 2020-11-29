import Observation, {DIMENSION_LLUVIA} from '../Model/observation';
import {parseToISOString} from '../util/date';

const LINE_SEPARATOR = `\n`;
const COMMA_SEPARATOR = `,`;
const DOUBLE_QUOTE = `"`;
const DATE_FORMAT = `YYYY-MM-DD hh:mm:ss`;
const STATION_ID = 'Termoandes';

export const termoandesParser = (content) => {
  const lines = content.split(LINE_SEPARATOR);
  const result = [];
  for (let i = 4; i < lines.length; i++) {
    const line = lines[i];
    if (line.length === 0) continue;
    const lineParts = line.split(COMMA_SEPARATOR);
    const dateString = lineParts[0].split(DOUBLE_QUOTE)[1];
    const date = parseToISOString(dateString, DATE_FORMAT);
    const value = parseFloat(lineParts[2]);
    const observation = new Observation({
      id: STATION_ID,
      dimension: DIMENSION_LLUVIA,
      value,
      date,
    });
    if (observation.date) {
      result.push(observation);
    }
  }
  return result;
};
