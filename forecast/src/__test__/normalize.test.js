import {normalizeForecast} from '../normalize';

describe('normalize forecast verification', () => {
  const forecastsMock = {
    provider1: {
      '2021-09-05': [{'14:00': '0.1'}, {'15:00': '0.2'}],
      '2021-09-06': [{'00:00': '0.1'}, {'03:00': '0.1'}, {'06:00': '0'}],
    },
    provider2: {
      '2021-09-05': [{'12:00': '0'}, {'15:00': '0'}, {'18:00': '0'}],
    },
  };
  it('should flatten all details', () => {
    const CITY_1 = 'city1';
    const PROVIDER_1 = 'provider1';
    const PROVIDER_2 = 'provider2';
    const p1Result = normalizeForecast(
      CITY_1,
      PROVIDER_1,
      forecastsMock[PROVIDER_1],
    );
    expect(p1Result.provider).toBe(PROVIDER_1);
    expect(p1Result.details).toHaveLength(5);
    expect(p1Result.details[0].time).toBe('2021-09-05T17:00:00.000Z');
    expect(p1Result.details[0].value).toBe('0.1');
    expect(p1Result.details[1].time).toBe('2021-09-05T18:00:00.000Z');
    expect(p1Result.details[1].value).toBe('0.2');
    const p2Result = normalizeForecast(
      CITY_1,
      PROVIDER_2,
      forecastsMock[PROVIDER_2],
    );
    expect(p2Result.provider).toBe(PROVIDER_2);
    expect(p2Result.details).toHaveLength(3);
  });
});
