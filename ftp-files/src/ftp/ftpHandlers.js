const defaultParams = {
  from: 0,
  to: 20,
};

const getFileData = async (ftpClient, {fileName}) => {
  const stream = await ftpClient.getFile(fileName);
  const arrayBuffer = await streamToArrayBuffer(stream);
  return new TextDecoder('utf8').decode(arrayBuffer);
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

const listFiles = async (
  ftpClient,
  {from = defaultParams.from, to = defaultParams.to},
) => {
  const fileList = await ftpClient.listFiles();
  const txtFileList = fileList.filter(
    ({name, size}) => name.endsWith('.txt') && size > 0,
  );
  txtFileList.sort(
    (f1, f2) => new Date(f2.date).getTime() - new Date(f1.date).getTime(),
  );
  return {
    fileList: txtFileList.slice(from, to),
    total: txtFileList.length,
  };
};
const allData = async (
  ftpClient,
  {from = defaultParams.from, to = defaultParams.to},
) => {
  const {fileList, total} = await listFiles(ftpClient, {from, to});
  const resultPromises = fileList.map((fileDescriptor) => {
    return new Promise(async (res, rej) => {
      let fileData = {};
      const {name: fileName} = fileDescriptor;
      fileData = await getFileData(ftpClient, {fileName});
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
