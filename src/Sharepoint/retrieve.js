import https from 'https';
import {SHAREPOINT_AUTH_COOKIE} from '../config';

const SHAREPOINT_URL = 'aescloud-my.sharepoint.com';

const baseHeaders = {
  Cookie: SHAREPOINT_AUTH_COOKIE,
};
const baseOptions = {
  hostname: SHAREPOINT_URL,
  port: 443,
};

// retrieve latest files
const latestFilesHeaders = {
  ...baseHeaders,
  'Content-Length': 0,
  Accept: 'application/json',
};
const latestFilesOptions = {
  ...baseOptions,
  path:
    '/personal/edgardo_mendez_aes_com/_api/web/GetListUsingPath(DecodedUrl=@a1)/RenderListDataAsStream?@a1=%27%2Fpersonal%2Fedgardo%5Fmendez%5Faes%5Fcom%2FDocuments%27&RootFolder=%2Fpersonal%2Fedgardo%5Fmendez%5Faes%5Fcom%2FDocuments%2FDatosCCO&SortField=Modified&SortDir=Desc',
  method: 'POST',
  headers: latestFilesHeaders,
};

// retrieve single file
const retrieveFileHeaders = {
  ...baseHeaders,
};
const retrieveFileOptions = {
  ...baseOptions,
  method: 'GET',
  headers: retrieveFileHeaders,
};

export const latestFiles = async () => {
  return new Promise((resolve, reject) => {
    const req = https.request(latestFilesOptions, (res) => {
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

export const retrieveFile = async (fileRef) => {
  return new Promise((resolve, reject) => {
    const requestOptions = {...retrieveFileOptions, path: fileRef};
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

export const latestFilesNonEmpty = async () => {
  const filesResponse = await latestFiles();
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

export const collectLatestData = async () => {
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
