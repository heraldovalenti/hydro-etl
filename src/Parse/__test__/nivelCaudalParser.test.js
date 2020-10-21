import {nivelCaudalParser} from '../nivelCaudalParser';

const testData = `"Nivel","475.50","24/08/20 00:10:02"
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

describe('nivel_caudal parser verification', () => {
  it('basic verification', () => {
    const result = nivelCaudalParser(testData, 'stationId');
    expect(result.length).toBe(16);
    const last = result[15];
    expect(last.id).toBe('stationId');
    expect(last.dimension).toBe('Caudal');
    expect(last.value).toBe('41.21');
    expect(last.date).toBe('2020-08-25T00:10:02.000Z');
  });
});
