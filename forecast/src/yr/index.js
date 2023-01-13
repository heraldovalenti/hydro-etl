import {fetchForecast} from './fetch';
import {parseDetailsHtml} from './parse';

export const yrForecast = async (city) => {
  const response = await fetchForecast(city);
  try {
    const result = parseDetailsHtml(response);
    return result;
  } catch (e) {
    console.warn(
      `Error while parsing results for ${city}: ${JSON.stringify(e)}`,
    );
  }
  return [];
};
