import {windyForecast} from '..';
import {CITY_SALTA, WINDY_MODEL_ECM} from '../../config';

describe('windy forecast verification', () => {
  it('fetch verification & extract verification', async () => {
    const result = await windyForecast({
      model: WINDY_MODEL_ECM,
      city: CITY_SALTA,
    });
    expect(Object.keys(result).length > 0).toBeTruthy();
    const todayKey = new Date().toISOString().substring(0, 10);
    expect(result[todayKey]).toBeDefined();
    expect(result[todayKey].length > 0).toBeTruthy();
    // console.log(result);
  });
});
