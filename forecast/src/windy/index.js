import {fetchForecast} from './fetch';
import {extractRainForecast} from './parse';

export const windyForecast = async () => {
  const response = await fetchForecast();
  return extractRainForecast(response);
};
