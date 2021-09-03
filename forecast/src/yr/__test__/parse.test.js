import fs from 'fs';
import {parseDetailsHtml} from '../parse';
describe('YR parse verification', () => {
  it('parse details', async () => {
    const htmlContent = await new Promise((res, rej) => {
      fs.readFile('src/yr/__test__/details.html', function (err, html) {
        if (err) {
          rej(err);
        }
        res(html.toString());
      });
    });
    const result = parseDetailsHtml(htmlContent);
    expect(Object.keys(result).length).toBe(9);
    expect(result['2021-08-30'].length).toBe(15);
    expect(result['2021-08-31'].length).toBe(24);
  });
});
