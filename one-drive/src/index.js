import {latestFiles, retrieveFile} from './Sharepoint';
import {parseFile, configsForFile} from './Parse';
import {SHAREPOINT_AUTH_COOKIE} from './config';

exports.latestData = async (req, res) => {
  const getAuthToken = (authToken = SHAREPOINT_AUTH_COOKIE) => authToken;
  const authToken = getAuthToken(req.query.authToken);
  const getShowRawData = (showRawData = false) => showRawData == 'true';
  const showRawData = getShowRawData(req.query.showRawData);
  res.set('Access-Control-Allow-Origin', '*');
  if (!authToken) {
    res.status(403).send({message: 'authToken is required'});
    return;
  }
  try {
    const filesWithData = await latestFiles(authToken);
    const filesWithDataAndConfig = filesWithData.filter((config) => {
      return configsForFile(config).length > 0;
    });
    const promises = filesWithDataAndConfig.map((fileEntry) =>
      retrieveFile(authToken, fileEntry.fileRef),
    );
    const promisesResults = await Promise.all(promises);
    for (let i = 0; i < filesWithDataAndConfig.length; i++) {
      const fileEntry = filesWithDataAndConfig[i];
      const promiseResult = promisesResults[i];
      fileEntry.rawData = promiseResult;
    }
    filesWithDataAndConfig.forEach((fileEntry) => {
      fileEntry.data = parseFile(fileEntry);
      if (!showRawData) {
        delete fileEntry.rawData;
      }
    });
    res.set('Content-Type', 'application/json');
    res.send(JSON.stringify(filesWithDataAndConfig));
  } catch (e) {
    const statusCode = e.statusCode ? e.statusCode : 500;
    console.warn(`Error fetching latest data: ${JSON.stringify(e)}`);
    res.status(statusCode).send(JSON.stringify(e));
  }
};
