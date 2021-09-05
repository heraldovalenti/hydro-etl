import {yrForecast} from '..';

describe('YR forecast verification', () => {
  it('fetch & parse verification', async () => {
    const result = await yrForecast();
    expect(Object.keys(result).length > 0).toBeTruthy();
    const todayKey = new Date().toISOString().substring(0, 10);
    expect(result[todayKey]).toBeDefined();
    expect(result[todayKey].length > 0).toBeTruthy();
    // console.log(result);
  });
});
