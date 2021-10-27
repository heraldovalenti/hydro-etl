import {WINDY_URLS} from '../config';
import {fetchForecast} from './fetch';
import {extractRainForecast} from './parse';

export const windyForecast = async ({model, city}) => {
  const url = WINDY_URLS[city][model];
  const response = await fetchForecast(url);
  return extractRainForecast(response);
};
