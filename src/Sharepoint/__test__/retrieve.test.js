import {latestFiles, retrieveFile, collectLatestData} from '../retrieve';
describe('general verification', () => {
  it('latest files simple test', async (done) => {
    const filesResponse = await latestFiles();
    // console.log(JSON.stringify(files));
    const files = filesResponse['Row'];
    expect(files.length).toBe(30);
    const filesNames = files.map((fileEntry) => {
      return {
        fileRef: fileEntry['FileRef'],
        size: fileEntry['FileSizeDisplay'],
        modified: fileEntry['Modified.'],
      };
    });
    console.log(filesNames);
    done();
  }, 15000);

  it('retrieve file simple test', async (done) => {
    const testFile =
      '/personal/edgardo_mendez_aes_com/Documents/DatosCCO/miraflores_2020-08-24.txt';
    const file = await retrieveFile(testFile);
    // console.log(JSON.stringify(files));
    // expect(files.length).toBe(30);
    console.log(`file content:
${file}`);
    done();
  }, 15000);

  it('collect latest data test', async () => {
    const latestData = await collectLatestData();
    console.log(latestData);
  });
});
