import {windyForecast} from '..';

describe('windy forecast verification', () => {
  it('fetch verification & extract verification', async () => {
    const result = await windyForecast();
    expect(Object.keys(result).length > 0).toBeTruthy();
    const todayKey = new Date().toISOString().substring(0, 10);
    expect(result[todayKey]).toBeDefined();
    expect(result[todayKey].length > 0).toBeTruthy();
    // console.log(result);
  });
});
