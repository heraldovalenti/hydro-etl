import {parseFile} from '../';

describe('Parse verification', () => {
  it('valid mapping verification', () => {
    const result = parseFile({
      fileName: 'CampoQuijano01-01-01.txt',
      rawData: 'Campo Quijano	Lluvia	2020-08-24 00:00:00.000	0	6.0	mm',
    });
    expect(result.id).toBe('Campo Quijano');
    expect(result.rainEntries.length).toBe(1);
    expect(result.rainEntries[0].level).toBe('6.0');
  });

  it('not valid mapping verification', () => {
    const result = parseFile({
      fileName: 'Nones01-01-01.txt',
      rawData: 'Nones	Lluvia	2020-08-24 00:00:00.000	0	6.0	mm',
    });
    expect(result).toStrictEqual({});
  });
});
