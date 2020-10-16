import {retrieveFile, latestFilesNonEmpty} from './Sharepoint';
import {parseFile, configsForFile} from './Parse';

exports.latestData = async (_req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  try {
    const filesWithData = await latestFilesNonEmpty();
    const filesWithDataAndConfig = filesWithData.filter((config) => {
      return configsForFile(config).length > 0;
    });
    console.log(
      `filesWithDataAndConfig ${JSON.stringify(filesWithDataAndConfig)}`,
    );
    const promises = filesWithDataAndConfig.map((fileEntry) =>
      retrieveFile(fileEntry.fileRef),
    );
    console.log(`promises ${JSON.stringify(promises)}`);
    const promisesResults = await Promise.all(promises);
    console.log(`promisesResults ${JSON.stringify(promisesResults)}`);
    for (let i = 0; i < filesWithDataAndConfig.length; i++) {
      const fileEntry = filesWithDataAndConfig[i];
      const promiseResult = promisesResults[i];
      fileEntry.rawData = promiseResult;
    }
    console.log;
    filesWithDataAndConfig.forEach((fileEntry) => {
      fileEntry.data = parseFile(fileEntry);
    });
    res.send(JSON.stringify(filesWithDataAndConfig));
  } catch (e) {
    const statusCode = e.statusCode ? e.statusCode : 500;
    console.warn(`Error fetching latest data: ${JSON.stringify(e)}`);
    res.status(statusCode).send(JSON.stringify(e));
  }
};
