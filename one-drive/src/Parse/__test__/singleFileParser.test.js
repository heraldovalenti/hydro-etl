import {DIMENSION_LLUVIA} from '../../Model/observation';
import {singleFileParser} from '../singleFileParser';

const testData = `"TOA5","TERMOANDES","CR1000","18914","CR1000X.Std.04.02","CPU:TERMOANDES.CR1X","1386","Table3"
"TIMESTAMP","RECORD","Rain_mm_Tot"
"TS","RN","mm"
"","","Tot"
"2020-10-30 16:00:00",0,0
"2020-10-30 16:30:00",1,0
"2020-10-30 17:00:00",2,0
"2020-10-30 18:00:00",3,3.4
"2020-10-30 18:30:00",4,0
"2020-10-30 19:00:00",5,0
"2020-10-30 19:30:00",6,0
"2020-10-30 20:00:00",7,0
"2020-10-30 20:30:00",8,0
"2020-10-30 21:00:00",9,0
`;

describe('singleFile parser verification', () => {
  it('singleFile station verification', () => {
    const result = singleFileParser(testData, 'Termoandes');
    expect(result.length).toBe(10);
    const last = result[9];
    expect(last.id).toBe('Termoandes');
    expect(last.dimension).toBe(DIMENSION_LLUVIA);
    expect(last.date).toBe('2020-10-31T00:00:00.000Z');
    expect(last.value).toBe(0);

    const fourth = result[3];
    expect(fourth.id).toBe('Termoandes');
    expect(fourth.dimension).toBe(DIMENSION_LLUVIA);
    expect(fourth.date).toBe('2020-10-30T21:00:00.000Z');
    expect(fourth.value).toBe(3.4);
  });

  it('limit verification', () => {
    const result = singleFileParser(testData, 'Termoandess', {resultLimit: 5});
    expect(result.length).toBe(5);
    const last = result[4];
    expect(last.id).toBe('Termoandess');
    expect(last.dimension).toBe(DIMENSION_LLUVIA);
    expect(last.date).toBe('2020-10-31T00:00:00.000Z');
    expect(last.value).toBe(0);

    const first = result[0];
    expect(first.id).toBe('Termoandess');
    expect(first.dimension).toBe(DIMENSION_LLUVIA);
    expect(first.date).toBe('2020-10-30T22:00:00.000Z');
    expect(first.value).toBe(0);
  });
});
