import {retrieveFile, latestFilesNonEmpty} from './Sharepoint';
import {parseFile} from './Parse';

exports.latestData = async (_req, res) => {
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
  res.set('Access-Control-Allow-Origin', '*');
  res.send(JSON.stringify(filesWithData));
};
