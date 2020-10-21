import {nivelCabralParser} from '../nivelCabralParser';

const testData = `"CCorral","1029.31","24/08/20 02:45:05"
"0.00"
"3758.00"
"PBlanca","942.10","24/08/20 02:45:06"
"PBlanca-Caudal","37.25","24/08/20 02:45:06"
"CCorral","1029.32","24/08/20 05:45:05"
"0.00"
"3758.00"
"PBlanca","941.50","24/08/20 05:45:06"
"PBlanca-Caudal","34.00","24/08/20 05:45:06"
"CCorral","1029.32","24/08/20 08:45:05"
"0.00"

"3758.00"
"PBlanca","940.80","24/08/20 08:45:06"
"PBlanca-Caudal","29.25","24/08/20 08:45:06"

`;

describe('Nivel Cabral parser verification', () => {
  it('basic verification', () => {
    const result = nivelCabralParser(testData);
    expect(result.length).toBe(9);

    const second = result[1];
    expect(second.id).toBe('PenasBlancas');
    expect(second.dimension).toBe('Nivel');
    expect(second.value).toBe('942.10');
    expect(second.date).toBe('2020-08-24T05:45:06.000Z');

    const last = result[8];
    expect(last.id).toBe('CabraCorral');
    expect(last.dimension).toBe('Caudal');
    expect(last.value).toBe('29.25');
    expect(last.date).toBe('2020-08-24T11:45:06.000Z');
  });
});
