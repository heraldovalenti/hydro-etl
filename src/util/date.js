import moment from 'moment';

export const parseToISOString = (dateString, DATE_FORMAT) => {
  const date = moment.utc(dateString, DATE_FORMAT).add(3, 'h');
  return date.toISOString();
};
