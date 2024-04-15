import {nivelCaudalParser} from '../nivelCaudalParser';

const testDataDotDecimalSeparator = `"Nivel","475.50","24/08/20 00:10:02"
"Caudal","42.16","24/08/20 00:10:02"
"Nivel","475.50","24/08/20 03:10:02"
"Caudal","42.11","24/08/20 03:10:02"
"Nivel","475.50","24/08/20 06:10:02"
"Caudal","42.11","24/08/20 06:10:02"
"Nivel","475.50","24/08/20 09:10:02"
"Caudal","42.09","24/08/20 09:10:02"
"Nivel","475.50","24/08/20 12:10:02"
"Caudal","42.23","24/08/20 12:10:02"
"Nivel","475.49","24/08/20 15:10:02"
"Caudal","42.23","24/08/20 15:10:02"
"Nivel","475.49","24/08/20 18:10:02"
"Caudal","42.07","24/08/20 18:10:02"
"Nivel","475.49","24/08/20 21:10:02"

"Caudal","41.21","24/08/20 21:10:02"
`;

const testDataCommaDecimalSeparator = `"Nivel","474,55","20/10/21 01:12:00"
"Caudal","38,55","20/10/21 01:12:00"
"Nivel","474,55","20/10/21 04:12:00"
"Caudal","38,64","20/10/21 04:12:00"
"Nivel","474,54","20/10/21 07:12:00"
"Caudal","38,76","20/10/21 07:12:00"
"Nivel","474,53","20/10/21 10:12:00"
"Caudal","38,49","20/10/21 10:12:00"`;

describe('nivel_caudal parser verification', () => {
  it('parse with dot as decimal separator', () => {
    const result = nivelCaudalParser(testDataDotDecimalSeparator, 'stationId');
    expect(result.length).toBe(16);
    const last = result[15];
    expect(last.id).toBe('stationId');
    expect(last.dimension).toBe('Caudal');
    expect(last.value).toBe('41.21');
    expect(last.date).toBe('2020-08-25T00:10:02.000Z');
  });

  it('parse with comma as decimal separator', () => {
    const result = nivelCaudalParser(
      testDataCommaDecimalSeparator,
      'stationId',
    );
    expect(result.length).toBe(8);
    const last = result[7];
    expect(last.id).toBe('stationId');
    expect(last.dimension).toBe('Caudal');
    expect(last.value).toBe('38.49');
    expect(last.date).toBe('2021-10-20T13:12:00.000Z');
  });
});
