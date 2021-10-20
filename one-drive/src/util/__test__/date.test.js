import {parseToISOString} from '../date';
describe('date util verification', () => {
  it('parseToString with milis', () => {
    const result = parseToISOString(
      '2020-10-21 00:00:00.000',
      'YYYY-MM-DD hh:mm:ss.SSS',
    );
    expect(result).toBe('2020-10-21T03:00:00.000Z');
  });

  it('parseToString without milis', () => {
    const result = parseToISOString(
      '2020-10-21 00:00:00',
      'YYYY-MM-DD hh:mm:ss',
    );
    expect(result).toBe('2020-10-21T03:00:00.000Z');
  });
  it('parseToString with AES format', () => {
    const result = parseToISOString('18/10/21 23:55:00', 'DD/MM/YY hh:mm:ss');
    expect(result).toBe('2021-10-19T02:55:00.000Z');
  });
});
