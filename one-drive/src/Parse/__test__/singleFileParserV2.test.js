import {DIMENSION_LLUVIA} from '../../Model/observation';
import {singleFileParserV2} from '../singleFileParserV2';

const testData = `                  Temp     Hi    Low   Out    Dew  Wind  Wind   Wind    Hi    Hi   Wind   Heat    THW   THSW                Rain  Solar   Solar Hi Solar   UV    UV    Hi     Heat    Cool    In     In    In     In     In   In Air          Wind  Wind    ISS   Arc.
Date    Time     Out   Temp   Temp   Hum    Pt. Speed   Dir    Run Speed   Dir  Chill  Index  Index  Index   Bar    Rain  Rate   Rad.  Energy    Rad.  Index  Dose   UV     D-D     D-D    Temp   Hum    Dew   Heat    EMC Density     ET   Samp   Tx   Recept  Int.
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  1/1/21   0:30   18.4   18.4   18.3    90   16.7   0.0     N   0.00   3.2     N   18.4   19.0   19.0    ---  1012.1  0.01   0.0   ---      ---    ---     ---   ---   ---   0.000   0.001   20.2    62   12.7   20.0  11.38  .0740     0.00   702    1    100.0   30 
 2/11/21   1:00   18.3   18.4   18.3    91   16.8   0.0   WSW   0.00   3.2     N   18.3   19.0   19.0    ---  1011.5  0.33   0.0   ---      ---    ---     ---   ---   ---   0.000   0.000   20.1    62   12.5   19.9  11.39  .0740     0.00   702    1    100.0   30 
24/11/21   1:30   18.2   18.4   18.2    90   16.6   0.0    SW   0.00   6.4    SW   18.2   18.8   18.8    ---  1010.7  0.45   0.0   ---      ---    ---     ---   ---   ---   0.002   0.000   19.7    62   12.2   19.4  11.40  .0741     0.00   703    1    100.0   30 
24/11/21   2:00   17.8   18.2   17.8    91   16.3   0.0    SW   0.00   1.6    SW   17.8   18.4   18.4    ---  1010.3  0.00   0.0   ---      ---    ---     ---   ---   ---   0.010   0.000   18.8    63   11.6   18.5  11.63  .0743     0.00   702    1    100.0   30 
24/11/21   2:30   17.2   17.8   17.2    92   15.9   0.0    SW   0.00   3.2    SW   17.2   17.6   17.6    ---  1009.7  2.00   0.0   ---      ---    ---     ---   ---   ---   0.024   0.000   18.1    64   11.2   17.7  11.76  .0744     0.00   702    1    100.0   30 
24/11/21   3:00   16.8   17.2   16.8    92   15.5   0.0    SW   0.00   1.6    SW   16.8   17.2   17.2    ---  1008.8  3.33   0.0   ---      ---    ---     ---   ---   ---   0.032   0.000   17.6    64   10.7   17.1  11.78  .0745     0.00   703    1    100.0   30 
24/11/21   3:30   16.3   16.8   16.3    92   15.0   0.0    SW   0.00   3.2    SW   16.3   16.6   16.6    ---  1008.6  0.00   0.0   ---      ---    ---     ---   ---   ---   0.043   0.000   17.2    65   10.5   16.7  11.99  .0746     0.00   702    1    100.0   30 
`;

const RESULT_COUNT = 7;
const STATION_ID = 'EscuelaMoldes';
describe('singleFileParserV2 file parser verification', () => {
  it('moldes station verification', () => {
    const result = singleFileParserV2(testData, STATION_ID, {rainIndex: 17});
    expect(result.length).toBe(RESULT_COUNT);
    const first = result[0];

    expect(first.id).toBe(STATION_ID);
    expect(first.dimension).toBe(DIMENSION_LLUVIA);
    expect(first.date).toBe('2021-11-24T06:30:00.000Z');
    expect(first.value).toBe(0);

    const second = result[1];
    expect(second.date).toBe('2021-11-24T06:00:00.000Z');
    expect(second.value).toBe(3.33);

    const sixth = result[5];
    expect(sixth.date).toBe('2021-11-02T04:00:00.000Z');
    expect(sixth.value).toBe(0.33);

    const seventh = result[6];
    expect(seventh.date).toBe('2021-01-01T03:30:00.000Z');
    expect(seventh.value).toBe(0.01);
  });

  it('limit verification', () => {
    const result = singleFileParserV2(testData, 'Termoandess', {
      resultLimit: 5,
    });
    expect(result.length).toBe(5);
  });
});
