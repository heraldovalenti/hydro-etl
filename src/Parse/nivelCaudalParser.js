import moment from 'moment';
import Observation from '../Model/observation';

const LINE_SEPARATOR = `\n`;
const COMMA_SEPARATOR = `,`;
const DOUBLE_QUOTE = `"`;
const DATE_FORMAT = `DD/MM/YY hh:mm:ss`;

export const nivelCaudalParser = (content, stationId) => {
  const lines = content.split(LINE_SEPARATOR);
  const result = [];
  for (let line of lines) {
    if (line.length === 0) continue;
    const lineParts = line.split(COMMA_SEPARATOR);
    const dimension = lineParts[0].split(DOUBLE_QUOTE)[1];
    const value = lineParts[1].split(DOUBLE_QUOTE)[1];
    const dateString = lineParts[2].split(DOUBLE_QUOTE)[1];
    const date = moment(dateString, DATE_FORMAT).toDate();
    const id = stationId;
    result.push(new Observation({id, dimension, value, date}));
  }
  return result;
};
