import {nivelCabraParser} from '../nivelCabraParser';

describe('Nivel Cabral parser verification', () => {
  const testDataDotSeparator = `"CCorral","1029.31","24/08/20 02:45:05"
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

  const testDataCommaSeparator = `
  "CCorral","1027,23","20/10/21 00:54:53"
  "0,00"
  "10065,00"
  "PBlanca","942,40","20/10/21 00:54:53"
  "PBlanca-Caudal","18,75","20/10/21 00:54:53"
  "CCorral","1027,23","20/10/21 01:54:52"
  "0,00"
  "10065,00"
  "PBlanca","942,30","20/10/21 01:54:52"
  "PBlanca-Caudal","18,50","20/10/21 01:54:52"
  "CCorral","1027,23","20/10/21 02:54:51"
  "0,00"
  
  `;
  it('parser with dot separator', () => {
    const result = nivelCabraParser(testDataDotSeparator);
    expect(result.length).toBe(9);

    const first = result[0];
    expect(first.id).toBe('CabraCorral');
    expect(first.dimension).toBe('Nivel');
    expect(first.value).toBe('1029.31');
    expect(first.date).toBe('2020-08-24T05:45:05.000Z');

    const second = result[1];
    expect(second.id).toBe('PenasBlancas');
    expect(second.dimension).toBe('Nivel');
    expect(second.value).toBe('942.10');
    expect(second.date).toBe('2020-08-24T05:45:06.000Z');

    const last = result[8];
    expect(last.id).toBe('PenasBlancas');
    expect(last.dimension).toBe('Caudal');
    expect(last.value).toBe('29.25');
    expect(last.date).toBe('2020-08-24T11:45:06.000Z');
  });
  it('parser with comma separator', () => {
    const result = nivelCabraParser(testDataCommaSeparator);
    expect(result.length).toBe(7);

    const first = result[0];
    expect(first.id).toBe('CabraCorral');
    expect(first.dimension).toBe('Nivel');
    expect(first.value).toBe('1027.23');
    expect(first.date).toBe('2021-10-20T03:54:53.000Z');

    const second = result[1];
    expect(second.id).toBe('PenasBlancas');
    expect(second.dimension).toBe('Nivel');
    expect(second.value).toBe('942.40');
    expect(second.date).toBe('2021-10-20T03:54:53.000Z');

    const third = result[5];
    expect(third.id).toBe('PenasBlancas');
    expect(third.dimension).toBe('Caudal');
    expect(third.value).toBe('18.50');
    expect(third.date).toBe('2021-10-20T04:54:52.000Z');
  });
});
