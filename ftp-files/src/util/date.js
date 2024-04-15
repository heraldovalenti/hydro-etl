const moment = require('moment');

const parseToISOString = (dateString, DATE_FORMAT) => {
  const date = moment.utc(dateString, DATE_FORMAT).add(3, 'h');
  return date.toISOString();
};

module.exports = {parseToISOString};
