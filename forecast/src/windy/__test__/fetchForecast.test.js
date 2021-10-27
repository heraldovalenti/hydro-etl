import {CITY_SALTA, WINDY_URLS, WINDY_MODEL_ECM} from '../../config';
import {fetchForecast} from '../fetch';

describe('windy forecast verification', () => {
  it('fetch verification', async () => {
    const result = await fetchForecast(WINDY_URLS[CITY_SALTA][WINDY_MODEL_ECM]);
    expect(result).toBeDefined();
  });
});
