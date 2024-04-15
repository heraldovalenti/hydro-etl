const {
  Observation,
  DIMENSION_NIVEL,
  DIMENSION_CAUDAL,
} = require('../model/observation');
const {parseToISOString} = require('../util/date');
const LINE_SEPARATOR = `\n`;
const COMMA_SEPARATOR = `,`;
const DOUBLE_QUOTE = `"`;
const DATE_FORMAT = `DD/MM/YY hh:mm:ss`;
const CCORRAL_ID = 'CabraCorral';
const CCORRAL_NIVEL = `CCorral`;
const PBLANCA_CAUDAL = `PBlanca-Caudal`;
const PBLANCA_ID = `PenasBlancas`;
const PBLANCA_NIVEL = `PBlanca`;
const NAME_ID_MAP = {
  [CCORRAL_NIVEL]: CCORRAL_ID,
  [PBLANCA_CAUDAL]: PBLANCA_ID,
  [PBLANCA_NIVEL]: PBLANCA_ID,
};
const NAME_DIMENSION_MAP = {
  [CCORRAL_NIVEL]: DIMENSION_NIVEL,
  [PBLANCA_CAUDAL]: DIMENSION_CAUDAL,
  [PBLANCA_NIVEL]: DIMENSION_NIVEL,
};

const nivelCabraParser = (content) => {
  const lines = content.split(LINE_SEPARATOR);
  const result = [];
  for (let line of lines) {
    if (line.length === 0) continue;
    const lineParts = line.split(DOUBLE_QUOTE);
    const name = lineParts[1];
    const id = NAME_ID_MAP[name];
    if (!id) continue;
    const value = lineParts[3].replace(COMMA_SEPARATOR, '.');
    const dateString = lineParts[5];
    const date = parseToISOString(dateString, DATE_FORMAT);
    const dimension = NAME_DIMENSION_MAP[name];
    const observation = new Observation({id, dimension, value, date});
    if (observation.date) {
      result.push(observation);
    }
  }
  return result;
};

module.exports = {nivelCabraParser};
