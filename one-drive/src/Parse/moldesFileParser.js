import Observation, {DIMENSION_LLUVIA} from '../Model/observation';
import {parseToISOString} from '../util/date';

const LINE_SEPARATOR = `\n`;
const SPACE_SEPARATOR = ` `;
const DATE_FORMAT = `D/MM/YY hh:mm`; // 24/11/21 22:30, 1/12/21 1:00

const RESULT_LIMIT = 2 * 24; // 1 day (2 observations per hour)
export const moldesFileParser = (
  content,
  stationId,
  resultLimit = RESULT_LIMIT,
) => {
  const lines = content.split(LINE_SEPARATOR);
  const observations = [];
  for (let i = lines.length - 1; i >= 3; i--) {
    const line = lines[i];
    if (line.length === 0) continue;
    const lineParts = line.split(SPACE_SEPARATOR).filter((line) => line !== '');
    const dateString = lineParts[0];
    const timeString = lineParts[1];
    const value = parseFloat(lineParts[17]);
    const date = parseToISOString(`${dateString} ${timeString}`, DATE_FORMAT);
    const observation = new Observation({
      id: stationId,
      dimension: DIMENSION_LLUVIA,
      value,
      date,
    });
    if (observation.date) {
      observations.push(observation);
    }
  }
  const result =
    observations.length > resultLimit
      ? observations.slice(0, resultLimit)
      : observations;
  console.log(
    `moldesFileParser for ${stationId} results=${observations.length}, truncated=${result.length}`,
  );
  return result;
};
