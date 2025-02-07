const GSHEET_DATE_FORMAT = 'yyyy-MM-dd H:mm:ss';
const stations = [
  {
    id: 'miraflores',
    page: 'Portal de Monitoreo',
    range: 'A:C',
    skipRows: 5,
    columns: [
      {
        name: 'date',
        index: 0,
      },
      {
        name: 'height',
        index: 2,
      },
    ],
  },
  {
    id: 'alemania',
    page: 'Portal de Monitoreo',
    range: 'D:F',
    skipRows: 5,
    columns: [
      {
        name: 'date',
        index: 0,
      },
      {
        name: 'height',
        index: 2,
      },
    ],
  },
  {
    id: 'quijano',
    page: 'Portal de Monitoreo',
    range: 'G:I',
    skipRows: 5,
    columns: [
      {
        name: 'date',
        index: 0,
      },
      {
        name: 'height',
        index: 2,
      },
    ],
  },
];
module.exports = { stations, GSHEET_DATE_FORMAT };
