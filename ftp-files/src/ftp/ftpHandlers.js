const {FTPClient} = require('./ftpClient');
const {ftpConfig} = require('./ftpConfig');

const defaultParams = {
  from: 0,
  to: 20,
};

const getFileData = async ({fileName}) => {
  const start = new Date();
  const ftpClient = new FTPClient(ftpConfig);
  await ftpClient.open();
  const stream = await ftpClient.getFile(fileName);
  const arrayBuffer = await streamToArrayBuffer(stream);
  const result = new TextDecoder('utf8').decode(arrayBuffer);
  ftpClient.close();
  const end = new Date();
  console.log('retrieved file data', fileName, end.getTime() - start.getTime());
  return result;
};

const streamToArrayBuffer = (stream) => {
  return new Promise((res, rej) => {
    const chunks = [];
    stream.on('data', (chunk) => {
      chunks.push(chunk);
    });
    stream.on('error', (e) => {
      return rej(e);
    });
    stream.on('end', () => {
      const buffer = Buffer.concat(chunks);
      const arrayBuffer = new ArrayBuffer(buffer.length);
      const view = new Uint8Array(arrayBuffer);
      for (let i = 0; i < buffer.length; ++i) {
        view[i] = buffer[i];
      }
      res(arrayBuffer);
    });
  });
};

const listFiles = async ({
  from = defaultParams.from,
  to = defaultParams.to,
} = {}) => {
  const start = new Date();
  const ftpClient = new FTPClient(ftpConfig);
  await ftpClient.open();
  const fileList = await ftpClient.listFiles();
  ftpClient.close();
  const txtFileList = fileList.filter(
    ({name, size}) => name.endsWith('.txt') && size > 0,
  );
  txtFileList.sort(
    (f1, f2) => new Date(f2.date).getTime() - new Date(f1.date).getTime(),
  );
  const end = new Date();
  console.log('retrieved file list', end.getTime() - start.getTime());
  return {
    fileList: txtFileList.slice(from, to),
    total: txtFileList.length,
  };
};
const allData = async ({
  from = defaultParams.from,
  to = defaultParams.to,
} = {}) => {
  const {fileList, total} = await listFiles({from, to});
  const resultPromises = fileList.map((fileDescriptor) => {
    return new Promise(async (res, rej) => {
      let fileData = {};
      const {name: fileName} = fileDescriptor;
      fileData = await getFileData({fileName});
      res({fileDescriptor, fileData});
    });
  });
  const result = await Promise.all(resultPromises);
  return {fileList: result, total};
};

module.exports = {
  getFileData,
  listFiles,
  allData,
};
