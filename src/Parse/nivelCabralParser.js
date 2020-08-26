import moment from 'moment';
import Observation, {
  DIMENSION_NIVEL,
  DIMENSION_CAUDAL,
} from '../Model/observation';

const LINE_SEPARATOR = `\n`;
const COMMA_SEPARATOR = `,`;
const DOUBLE_QUOTE = `"`;
const DATE_FORMAT = `DD/MM/YY hh:mm:ss`;
const CCORRAL_ID = 'CabraCorral';
const CCORRAL_NIVEL = `CCorral`;
const CCORRAL_CAUDAL = `PBlanca-Caudal`;
const PBLANCA_ID = `PenasBlancas'`;
const PBLANCA_NIVEL = `PBlanca`;
const NAME_ID_MAP = {
  [CCORRAL_NIVEL]: CCORRAL_ID,
  [CCORRAL_CAUDAL]: CCORRAL_ID,
  [PBLANCA_NIVEL]: PBLANCA_ID,
};
const NAME_DIMENSION_MAP = {
  [CCORRAL_NIVEL]: DIMENSION_NIVEL,
  [CCORRAL_CAUDAL]: DIMENSION_CAUDAL,
  [PBLANCA_NIVEL]: DIMENSION_NIVEL,
};

export const nivelCabralParser = (content) => {
  const lines = content.split(LINE_SEPARATOR);
  const result = [];
  for (let line of lines) {
    if (line.length === 0) continue;
    const lineParts = line.split(COMMA_SEPARATOR);
    const name = lineParts[0].split(DOUBLE_QUOTE)[1];
    const id = NAME_ID_MAP[name];
    if (!id) continue;
    const value = lineParts[1].split(DOUBLE_QUOTE)[1];
    const dateString = lineParts[2].split(DOUBLE_QUOTE)[1];
    const date = moment(dateString, DATE_FORMAT).toDate();
    const dimension = NAME_DIMENSION_MAP[name];
    // console.log(`line=${line} ${id} ${dimension} ${value} ${date}`);
    result.push(new Observation({id, dimension, value, date}));
  }
  return result;
};
