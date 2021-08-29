import {parseFile} from '../';

describe('Parse verification', () => {
  it('valid mapping verification', () => {
    const result = parseFile({
      fileName: 'CampoQuijano_01-01-01.txt',
      rawData: 'Campo Quijano	Lluvia	2020-08-24 00:00:00.000	0	6.0	mm',
    });
    expect(result.length).toBe(1);
    expect(result[0].id).toBe('CampoQuijano');
    expect(result[0].value).toBe('6.0');
  });

  it('not valid mapping verification', () => {
    const result = parseFile({
      fileName: 'Nones01-01-01.txt',
      rawData: 'Nones	Lluvia	2020-08-24 00:00:00.000	0	6.0	mm',
    });
    expect(result).toStrictEqual({});
  });
});
