const express = require('express');
const {ftpConfig} = require('./ftpConfig');
const {FTPClient} = require('./ftp');
const {allData} = require('./ftpHandlers');
const {parseFile} = require('../Parse');

const app = express();

app.get('/latestData', async (req, res) => {
  try {
    const {query} = req;

    const ftpClient = new FTPClient(ftpConfig);
    await ftpClient.open();
    const {fileList} = await allData(ftpClient, query);
    ftpClient.close();

    const parsedFileEntries = fileList
      .map(({fileDescriptor: {name}, fileData}) => ({
        fileName: name,
        rawData: fileData,
      }))
      .map((fileEntry) => {
        const parsedData = parseFile(fileEntry);
        return {
          fileName: fileEntry.fileName,
          data: parsedData,
        };
      });

    const result = parsedFileEntries;
    res.status(200).json(result);
  } catch (e) {
    console.error(e);
    res.status(500).json({e, path, query});
  }
});

// Listen to the App Engine-specified port, or 8000 otherwise
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
