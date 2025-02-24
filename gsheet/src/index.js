const { google } = require('googleapis');
const { stations, GSHEET_DATE_FORMAT } = require('./configs');
const { parse, parseISO, isEqual, isAfter, isBefore } = require('date-fns');

const fetchPageData = async (auth, station, pageSize, from, to) => {
  const sheets = google.sheets({ version: 'v4', auth });
  const { id, page, range, columns, skipRows } = station;
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${page}!${range}`,
  });
  let observations = [];
  const rows = res.data.values.slice(skipRows);
  rows
    .filter((r) => r.length > 0)
    .forEach((row) => {
      const observation = {};
      columns.forEach(({ name, index }) => {
        observation[name] = row[index];
      });
      const notEmpty = Object.values(observation).reduce(
        (prev, curr) => !!curr && prev,
        true,
      );
      if (notEmpty) observations.push(observation);
    });
  if (from) {
    const fromDate = parseISO(from);
    observations = observations.filter((o) => {
      const oDate = parse(o.date, GSHEET_DATE_FORMAT, new Date());
      return isEqual(oDate, fromDate) || isAfter(oDate, fromDate);
    });
  }
  if (to) {
    const toDate = parseISO(to);
    observations = observations.filter((o) => {
      const oDate = parse(o.date, GSHEET_DATE_FORMAT, new Date());
      return isEqual(oDate, toDate) || isBefore(oDate, toDate);
    });
  }
  return {
    id,
    observations: observations.slice(-pageSize),
  };
};

const root = async (req) => {
  const authToken = req.get('auth-token');
  const { stationId, pageSize = 20, from, to } = req.query || {};
  console.log('fetching data for', { stationId, pageSize, from, to });
  const auth = google.auth.fromJSON({
    ...authConfig,
    refresh_token: authToken,
  });
  if (stationId) {
    const station = stations.find((s) => s.id === stationId);
    if (!station) {
      return null;
    }
    const result = await fetchPageData(auth, station, pageSize, from, to);
    return result;
  }

  const toResolve = stations.map((station) =>
    fetchPageData(auth, station, pageSize, from, to),
  );

  const result = await Promise.all(toResolve);
  return result;
};

// const apis = {
//   ['/']: root,
// };

const gsheet = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET');
  res.set('Access-Control-Allow-Headers', 'Authorization');

  const { path, query } = req;
  res.set('Content-Type', 'application/json');

  const api = root;
  // const api = apis[path];
  // if (!api) {
  //   res.status(404).send(`No handler available for ${path}`);
  //   return;
  // }
  res.set('Content-Type', 'application/json');
  try {
    const result = await api(req);
    res.status(200).send(JSON.stringify(result));
  } catch (e) {
    console.error(e);
    res.status(500).send(JSON.stringify({ e, path, query }));
  }
};

const authConfig = {
  type: process.env['TYPE'],
  client_id: process.env['CLIENT_ID'],
  client_secret: process.env['CLIENT_SECRET'],
  // refresh_token: process.env['REFRESH_TOKEN'],
};
const spreadsheetId = process.env['SPREADSHEET_ID'];

module.exports = { gsheet };
