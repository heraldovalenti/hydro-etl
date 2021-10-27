import {yrForecast} from '..';
import {CITY_CAFAYATE, CITY_METAN, CITY_MOLDES, CITY_SALTA} from '../../config';

describe('YR forecast verification', () => {
  it('fetch & parse verification - salta', async () => {
    const result = await yrForecast(CITY_SALTA);
    expect(Object.keys(result).length > 0).toBeTruthy();
    const todayKey = new Date().toISOString().substring(0, 10);
    expect(result[todayKey]).toBeDefined();
    expect(result[todayKey].length > 0).toBeTruthy();
    // console.log(result);
  });
  it('fetch & parse verification - moldes', async () => {
    const result = await yrForecast(CITY_MOLDES);
    expect(Object.keys(result).length > 0).toBeTruthy();
    const todayKey = new Date().toISOString().substring(0, 10);
    expect(result[todayKey]).toBeDefined();
    expect(result[todayKey].length > 0).toBeTruthy();
    // console.log(result);
  });
  it('fetch & parse verification - cafayate', async () => {
    const result = await yrForecast(CITY_CAFAYATE);
    expect(Object.keys(result).length > 0).toBeTruthy();
    const todayKey = new Date().toISOString().substring(0, 10);
    expect(result[todayKey]).toBeDefined();
    expect(result[todayKey].length > 0).toBeTruthy();
    // console.log(result);
  });
  it('fetch & parse verification - metan', async () => {
    const result = await yrForecast(CITY_METAN);
    expect(Object.keys(result).length > 0).toBeTruthy();
    const todayKey = new Date().toISOString().substring(0, 10);
    expect(result[todayKey]).toBeDefined();
    expect(result[todayKey].length > 0).toBeTruthy();
    // console.log(result);
  });
});
