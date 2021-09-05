import {parseToISOString} from '../date';
describe('date util verification', () => {
  it('parseToString verification with format YYYY-MM-DD hh:mm:ss.SSS', () => {
    const result = parseToISOString(
      '2020-10-21 00:00:00.000',
      'YYYY-MM-DD hh:mm:ss.SSS',
    );
    expect(result).toBe('2020-10-21T03:00:00.000Z');
  });
  it('parseToString verification with format YYYY-MM-DD HH:mm', () => {
    const result = parseToISOString('2020-10-21 00:00', 'YYYY-MM-DD HH:mm');
    expect(result).toBe('2020-10-21T03:00:00.000Z');
  });
});
