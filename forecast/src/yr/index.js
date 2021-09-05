import {fetchForecast} from './fetch';
import {parseDetailsHtml} from './parse';

export const yrForecast = async () => {
  const response = await fetchForecast();
  return parseDetailsHtml(response);
};
