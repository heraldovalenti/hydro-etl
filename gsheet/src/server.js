require('dotenv').config();
const express = require('express');
var cors = require('cors');
const { gsheet } = require('.');

const app = express();
const port = 8085;

app.use(cors());

app.get('/gsheet', (req, res) => {
  // const path = req.path.substring(7);
  // console.log('mapping request', {from: req.path, to: path});
  gsheet(
    {
      ...req,
      // path
    },
    res,
  );
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
