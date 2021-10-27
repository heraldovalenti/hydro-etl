import {fetchForecast} from './fetch';
import {parseDetailsHtml} from './parse';

export const yrForecast = async (city) => {
  const response = await fetchForecast(city);
  return parseDetailsHtml(response);
};
