import {fetchForecast} from '..';
import {extractRainForecast} from '../parse';

describe('windy forecast verification', () => {
  it('fetch verification & extract verification', async () => {
    const windyJson = await fetchForecast();
    expect(windyJson).toBeDefined();
    const result = extractRainForecast(windyJson);
    expect(Object.keys(result).length > 0).toBeTruthy();
    const todayKey = new Date().toISOString().substring(0, 10);
    expect(result[todayKey]).toBeDefined();
    expect(result[todayKey].length > 0).toBeTruthy();
    // console.log(result);
  });
});
