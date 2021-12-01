const {Observation, DIMENSION_LLUVIA} = require('../Model/observation');
const {parseToISOString} = require('../util/date');

const LINE_SEPARATOR = `\n`;
const COMMA_SEPARATOR = `,`;
const DOUBLE_QUOTE = `"`;
const DATE_FORMAT = `YYYY-MM-DD hh:mm:ss`;

const RESULT_LIMIT = 2 * 24; // 1 day (2 observations per hour)
const singleFileParser = (content, stationId, resultLimit = RESULT_LIMIT) => {
  const lines = content.split(LINE_SEPARATOR);
  const observations = [];
  for (let i = 4; i < lines.length; i++) {
    const line = lines[i];
    if (line.length === 0) continue;
    const lineParts = line.split(COMMA_SEPARATOR);
    const dateString = lineParts[0].split(DOUBLE_QUOTE)[1];
    const date = parseToISOString(dateString, DATE_FORMAT);
    const value = parseFloat(lineParts[2]);
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
      ? observations.slice(
          observations.length - resultLimit,
          observations.length,
        )
      : observations;
  console.log(
    `SingleFileParser for ${stationId} results=${observations.length}, truncated=${result.length}`,
  );
  return result;
};

module.exports = {singleFileParser};
