const {Observation} = require('../Model/observation');
const {parseToISOString} = require('../util/date');

const LINE_SEPARATOR = `\n`;
const COMMA_SEPARATOR = `,`;
const DOUBLE_QUOTE = `"`;
const DATE_FORMAT = `DD/MM/YY hh:mm:ss`;

const nivelCaudalParser = (content, stationId) => {
  const lines = content.split(LINE_SEPARATOR);
  const result = [];
  for (let line of lines) {
    if (line.length === 0) continue;
    const lineParts = line.split(DOUBLE_QUOTE);
    const dimension = lineParts[1];
    const value = lineParts[3].replace(COMMA_SEPARATOR, '.');
    const dateString = lineParts[5];
    const date = parseToISOString(dateString, DATE_FORMAT);
    const id = stationId;
    result.push(new Observation({id, dimension, value, date}));
  }
  return result;
};

module.exports = {nivelCaudalParser};
