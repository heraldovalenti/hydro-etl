const stations = [
  {
    id: 'miraflores',
    page: 'Sheet1',
    range: 'A:C',
    skipRows: 1,
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
    page: 'Sheet2',
    range: 'D:F',
    skipRows: 1,
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
    page: 'Sheet3',
    range: 'G:I',
    skipRows: 1,
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
module.exports = { stations };
