const express = require('express');
var cors = require('cors');
const {rasters} = require('.');

const app = express();
const port = 8083;

app.use(cors());

app.get('/rasters/*', (req, res) => {
  const path = req.path.substring(8);
  // console.log('mapping request', {from: req.path, to: path});
  rasters({...req, path}, res);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
