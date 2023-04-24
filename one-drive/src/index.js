const {latestFiles, retrieveFile} = require('./Sharepoint');
const {parseFile, configsForFile} = require('./Parse');

const latestData = async (req, res) => {
  const {authTokens} = req.body;
  const getFlag = (flag = false) => flag == 'true';
  const isHealthCheck = getFlag(req.query.healthCheck);
  const isShowRawData = getFlag(req.query.showRawData);
  console.log(
    `latestData() isHealthCheck=${isHealthCheck} isShowRawData=${isShowRawData}`,
  );
  res.set('Access-Control-Allow-Origin', '*');
  if (!authTokens) {
    res.status(403).send({message: 'authTokens are required'});
    return;
  }
  try {
    res.set('Content-Type', 'application/json');
    const filesWithData = await latestFiles(authTokens);
    if (isHealthCheck) {
      res.status(200).send([]);
      return;
    }
    const filesWithDataAndConfig = filesWithData.filter((config) => {
      return configsForFile(config).length > 0;
    });
    const promises = filesWithDataAndConfig.map((fileEntry) =>
      retrieveFile(authTokens, fileEntry.fileRef),
    );
    const promisesResults = await Promise.all(promises);
    for (let i = 0; i < filesWithDataAndConfig.length; i++) {
      const fileEntry = filesWithDataAndConfig[i];
      const promiseResult = promisesResults[i];
      fileEntry.rawData = promiseResult;
    }
    filesWithDataAndConfig.forEach((fileEntry) => {
      fileEntry.data = parseFile(fileEntry);
      if (!isShowRawData) {
        delete fileEntry.rawData;
      }
    });
    res.send(JSON.stringify(filesWithDataAndConfig));
  } catch (e) {
    const statusCode = e.statusCode ? e.statusCode : 500;
    console.warn(`Error fetching latest data: ${JSON.stringify(e)}`);
    res.status(statusCode).send(JSON.stringify(e));
  }
};

module.exports = {latestData};
