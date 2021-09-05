import {fetchForecast} from '../fetch';

describe('windy forecast verification', () => {
  it('fetch verification', async () => {
    const result = await fetchForecast();
    expect(result).toBeDefined();
  });
});
