import {parseToISOString} from '../date';
describe('date util verification', () => {
  it('parseToString verification', () => {
    const result = parseToISOString(
      '2020-10-21 00:00:00.000',
      'YYYY-MM-DD hh:mm:ss.SSS',
    );
    expect(result).toBe('2020-10-21T03:00:00.000Z');
  });
});
