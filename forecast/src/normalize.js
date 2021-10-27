import {parseToISOString} from './util/date';

export const normalizeForecast = (city, provider, forecast) => {
  const DATE_FORMAT = `YYYY-MM-DD HH:mm`;
  const details = [];
  for (let dayKey in forecast) {
    const hours = forecast[dayKey];
    for (let hour of hours) {
      const hourKey = Object.keys(hour)[0];
      const time = parseToISOString(`${dayKey} ${hourKey}`, DATE_FORMAT);
      const value = hour[hourKey];
      details.push({time, value});
    }
  }
  return {
    city,
    provider,
    details,
  };
};
