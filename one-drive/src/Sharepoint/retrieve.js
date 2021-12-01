const https = require('https');

const SHAREPOINT_URL = 'aescloud-my.sharepoint.com';

const baseHeaders = (authToken) => {
  return {
    Cookie: `FedAuth=${authToken}`,
  };
};
const baseOptions = {
  hostname: SHAREPOINT_URL,
  port: 443,
};
// retrieve latest files
const latestFilesHeaders = (authToken) => {
  return {
    ...baseHeaders(authToken),
    'Content-Length': 0,
    Accept: 'application/json',
  };
};
const latestFilesOptions = (authToken) => {
  return {
    ...baseOptions,
    path: '/personal/edgardo_mendez_aes_com/_api/web/GetListUsingPath(DecodedUrl=@a1)/RenderListDataAsStream?@a1=%27%2Fpersonal%2Fedgardo%5Fmendez%5Faes%5Fcom%2FDocuments%27&RootFolder=%2Fpersonal%2Fedgardo%5Fmendez%5Faes%5Fcom%2FDocuments%2FDatosCCO&SortField=Modified&SortDir=Desc',
    method: 'POST',
    headers: latestFilesHeaders(authToken),
  };
};

// retrieve single file
const retrieveFileHeaders = (authToken) => {
  return {
    ...baseHeaders(authToken),
  };
};

const retrieveFileOptions = (authToken) => {
  return {
    ...baseOptions,
    method: 'GET',
    headers: retrieveFileHeaders(authToken),
  };
};

const latestFiles = async (authToken) => {
  return new Promise((resolve, reject) => {
    const req = https.request(latestFilesOptions(authToken), (res) => {
      // console.log(`statusCode: ${res.statusCode}`);
      // console.log(`statusMessage: ${res.statusMessage}`);

      res.setEncoding('utf8');
      let rawData = '';
      res.on('data', (chunk) => {
        // console.log(`partial data: ${chunk}`);
        rawData += chunk;
      });
      res.on('end', () => {
        try {
          if (res.statusCode === 403) {
            const response = JSON.parse(rawData);
            response.statusCode = 403;
            // console.error(`data: ${res.toString()}`);
            reject(response);
          } else {
            const parsedData = JSON.parse(rawData);
            resolve(parsedData);
          }
        } catch (e) {
          // console.log(`request end with error: ${JSON.stringify(e)}`);
          reject(e);
        }
      });
    });

    req.on('error', (error) => {
      // console.error(error);
      reject(error);
    });

    req.end();
  });
};

const retrieveFile = async (authToken, fileRef) => {
  return new Promise((resolve, reject) => {
    const requestOptions = {...retrieveFileOptions(authToken), path: fileRef};
    const req = https.request(requestOptions, (res) => {
      // console.log(`statusCode: ${res.statusCode}`);
      // console.log(`statusMessage: ${res.statusMessage}`);

      // res.setEncoding('utf8');
      // res.setEncoding('win1252');
      let rawData = '';
      res.on('data', (chunk) => {
        // console.log(`partial data: ${chunk}`);
        rawData += chunk;
      });
      res.on('end', () => {
        // console.log(`data end`);
        try {
          if (res.statusCode === 403) {
            reject(rawData);
          } else {
            resolve(rawData);
          }
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', (error) => {
      // console.error(error);
      reject(error);
    });

    req.end();
  });
};

const latestFilesNonEmpty = async (authToken) => {
  const filesResponse = await latestFiles(authToken);
  const files = filesResponse['Row'];
  const filesDetails = files.map((fileEntry) => {
    return {
      fileRef: fileEntry['FileRef'],
      fileName: fileEntry['FileLeafRef'],
      size: fileEntry['FileSizeDisplay'],
      modified: fileEntry['Modified.'],
    };
  });
  const filesWithData = filesDetails.filter((fileEntry) => fileEntry.size > 0);
  return filesWithData;
};

const collectLatestData = async () => {
  const filesWithData = await latestFilesNonEmpty();
  const promises = filesWithData.map((fileEntry) =>
    retrieveFile(fileEntry.fileRef),
  );
  const promisesResults = await Promise.all(promises);
  const result = promisesResults.reduce(
    (fileResult, current) => `${current}
${fileResult}`,
    '',
  );
  return result;
};

module.exports = {
  collectLatestData,
  latestFilesNonEmpty,
  retrieveFile,
  latestFiles,
};
