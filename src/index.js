import {retrieveFile, latestFilesNonEmpty} from './Sharepoint';
import {parseFile} from './Parse';

exports.latestData = async (_req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  try {
    const filesWithData = await latestFilesNonEmpty();
    const promises = filesWithData.map((fileEntry) =>
      retrieveFile(fileEntry.fileRef),
    );
    const promisesResults = await Promise.all(promises);
    for (let i = 0; i < filesWithData.length; i++) {
      const fileEntry = filesWithData[i];
      const promiseResult = promisesResults[i];
      fileEntry.rawData = promiseResult;
    }
    filesWithData.forEach((fileEntry) => {
      fileEntry.data = parseFile(fileEntry);
    });
    res.send(JSON.stringify(filesWithData));
  } catch (e) {
    const statusCode = e.statusCode ? e.statusCode : 500;
    console.warn(`Error fetching latest data: ${JSON.stringify(e)}`);
    res.status(statusCode).send(JSON.stringify(e));
  }
};
