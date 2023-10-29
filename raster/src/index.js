require('dotenv').config();
const {FTPClient} = require('./ftp');
const {propsFromFile, streamToArrayBuffer} = require('./tiff');

const getFileData = async (ftpClient, {fileName}) => {
  const stream = await ftpClient.getFile(fileName);
  const arrayBuffer = await streamToArrayBuffer(stream);
  const result = propsFromFile(arrayBuffer);
  return result;
};
const defaultType = 'WRF';
const fileTypes = {WRF: 'prcpWRF_dia', SQPE: 'SQPE-OBS'};
const listFiles = async (ftpClient, {results = 3, type = defaultType}) => {
  const fileList = await ftpClient.listFiles();
  const tiffFileList = fileList.filter((fileDescriptor) =>
    fileDescriptor.name.includes(fileTypes[type]),
  );
  tiffFileList.sort(
    (f1, f2) => new Date(f2.date).getTime() - new Date(f1.date).getTime(),
  );
  return tiffFileList.slice(0, results);
};
const allData = async (ftpClient, {from = 0, to = 5, type = defaultType}) => {
  const fileList = await listFiles(ftpClient, {type});
  const resultPromises = fileList.slice(from, to).map((fileDescriptor) => {
    return new Promise(async (res, rej) => {
      let fileData = {};
      const {name: fileName} = fileDescriptor;
      if (fileName.includes('prcpWRF_dia')) {
        fileData = await getFileData(ftpClient, {fileName});
      }
      res({fileDescriptor, fileData});
    });
  });
  const result = await Promise.all(resultPromises);
  return result;
};
const apis = {
  ['/list']: listFiles,
  ['/get']: getFileData,
  ['/all']: allData,
};
const rasters = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET');
  res.set('Access-Control-Allow-Headers', 'Authorization');

  const {path, query} = req;
  const api = apis[path];
  if (!api) {
    res.status(404).send(`No handler available for ${path}`);
    return;
  }
  res.set('Content-Type', 'application/json');
  try {
    const ftpClient = new FTPClient(ftpConfig);
    await ftpClient.open();
    const result = await api(ftpClient, query);
    ftpClient.close();
    res.status(200).send(JSON.stringify(result));
  } catch (e) {
    console.error(e);
    res.status(500).send(JSON.stringify({e, path, query}));
  }
};

const ftpConfig = {
  host: process.env['FTP_HOSTNAME'],
  port: process.env['FTP_PORT'],
  user: process.env['FTP_USERNAME'],
  password: process.env['FTP_PASSWORD'],
};

module.exports = {rasters};
