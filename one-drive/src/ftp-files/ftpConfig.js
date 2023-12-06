const ftpConfig = {
  host: process.env["FTP_HOSTNAME"],
  port: process.env["FTP_PORT"],
  user: process.env["FTP_USERNAME"],
  password: process.env["FTP_PASSWORD"],
};

module.exports = { ftpConfig };
