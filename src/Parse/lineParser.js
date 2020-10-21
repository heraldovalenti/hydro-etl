import Observation, {
  DIMENSION_BATERIA,
  DIMENSION_LLUVIA,
  DIMENSION_NIVEL,
  DIMENSION_ALARMA,
} from '../Model/observation';
import {parseToISOString} from '../util/date';

const DATE_FORMAT = `YYYY-MM-DD hh:mm:ss.SSS`;
const BATTERY = `Bater�a`;
const RAIN = `Lluvia`;
const HEIGHT = `Altura`;
const ALARM = `Alarma`;
const TAB_SEPARATOR = `\t`;
const LINE_SEPARATOR = `\n`;
const DIMENSION_MAP = {
  [BATTERY]: DIMENSION_BATERIA,
  [RAIN]: DIMENSION_LLUVIA,
  [HEIGHT]: DIMENSION_NIVEL,
  [ALARM]: DIMENSION_ALARMA,
};

export const lineParser = (content, stationId) => {
  const lines = content.split(LINE_SEPARATOR);
  const result = [];
  for (let line of lines) {
    if (line.length === 0) continue;
    const lineParts = line.split(TAB_SEPARATOR);
    const type = lineParts[1];
    const dimension = DIMENSION_MAP[type];
    const rawDateString = lineParts[2];
    const dateString = parseToISOString(rawDateString, DATE_FORMAT);
    const entry = new Observation({
      id: stationId,
      date: dateString,
      other: lineParts[3],
      value: lineParts[4],
      unit: lineParts[5],
      dimension,
    });
    result.push(entry);
  }
  return result;
};
