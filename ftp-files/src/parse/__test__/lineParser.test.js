import {lineParser} from '../lineParser';

const contentSample = `Campo Quijano	Bater�a	2020-08-24 03:00:00.000	0	12.6666669845581	V\r
Campo Quijano	Lluvia	2020-08-24 00:00:00.000	0	6.0	mm\r
Campo Quijano	Lluvia	2020-08-24 06:00:00.000	0	6.0	mm\r
Campo Quijano	Lluvia	2020-08-24 12:00:00.000	0	6.0	mm\r
Campo Quijano	Lluvia	2020-08-24 18:00:00.000	0	6.0	mm\r
Campo Quijano	Altura	2020-08-24 00:00:00.000	0	0.393999993801117	m\r
Campo Quijano	Altura	2020-08-24 03:00:00.000	0	0.43099999427795399	m\r
Campo Quijano	Altura	2020-08-24 06:00:00.000	0	0.37799999117851302	m\r
Campo Quijano	Altura	2020-08-24 09:00:00.000	0	0.57700002193450906	m\r
Campo Quijano	Altura	2020-08-24 12:00:00.000	0	0.60299998521804798	m\r
Campo Quijano	Altura	2020-08-24 15:00:00.000	0	0.51200002431869496	m\r
Campo Quijano	Altura	2020-08-24 18:00:00.000	0	0.42599999904632602	m\r

`;

describe('line parser verification', () => {
  it('contentSample test', () => {
    const stationId = 'CampoQuijano';
    const result = lineParser(contentSample, stationId);
    expect(result.length).toBe(12);
    const first = result[0];
    expect(first.id).toBe(stationId);
    expect(first.dimension).toBe('Bateria');
    expect(first.value).toBe('12.6666669845581');
    expect(first.date).toBe('2020-08-24T06:00:00.000Z');
    const second = result[1];
    expect(second.id).toBe(stationId);
    expect(second.dimension).toBe('Lluvia');
    expect(second.value).toBe('6.0');
    expect(second.unit).toBe('mm\r');
    expect(second.date).toBe('2020-08-24T03:00:00.000Z');
    const last = result[11];
    expect(last.id).toBe(stationId);
    expect(last.dimension).toBe('Nivel');
    expect(last.value).toBe('0.42599999904632602');
    expect(last.date).toBe('2020-08-24T21:00:00.000Z');
  });
});
