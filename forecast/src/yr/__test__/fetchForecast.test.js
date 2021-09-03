import {fetchForecast} from '..';
import {parseDetailsHtml} from '../parse';

describe('YR forecast verification', () => {
  it('fetch & parse verification', async () => {
    const htmlContent = await fetchForecast();
    expect(htmlContent).toBeDefined();
    const result = parseDetailsHtml(htmlContent);
    expect(Object.keys(result).length > 0).toBeTruthy();
    const todayKey = new Date().toISOString().substring(0, 10);
    expect(result[todayKey]).toBeDefined();
    expect(result[todayKey].length > 0).toBeTruthy();
    // console.log(result);
  });
});
