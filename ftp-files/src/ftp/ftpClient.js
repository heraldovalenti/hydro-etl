const ftp = require('ftp');

function FTPClient(config) {
  this.client = new ftp();
  this.open = () => {
    return new Promise((res, rej) => {
      this.client.on('ready', () => {
        res();
      });
      this.client.on('error', (e) => {
        rej(e);
      });
      this.client.connect(config);
    });
  };
  this.close = () => {
    this.client.end();
  };
  this.listFiles = function () {
    return new Promise((res, rej) => {
      const client = new ftp();
      client.on('ready', () => {
        client.list((err, list) => {
          if (err) rej(err);
          client.end();
          res(list);
        });
      });
      client.on('error', (e) => {
        rej(e);
      });
      client.connect(config);
    });
  };
  this.getFile = function (fileName) {
    return new Promise((res, rej) => {
      this.client.get(fileName, (err, stream) => {
        if (err) rej(err);
        res(stream);
      });
    });
  };
}

module.exports = {FTPClient};
