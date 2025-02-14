import {parse} from 'node-html-parser';

export const parseDetailsHtml = (html) => {
  const root = parse(html);
  const appRoot = root.querySelector('#app-root');
  const detailsTable = appRoot.querySelector('#details-page__table');
  const dayHeaders = detailsTable.querySelectorAll('.heading--color-primary');
  const dayTables = detailsTable.querySelectorAll('.hourly-weather-table');
  const result = {};
  for (let i = 0; i < dayHeaders.length && i < dayTables.length; i++) {
    const date = dayHeaders[i].querySelector('time').getAttribute('datetime');
    const tableRows = dayTables[i]
      .querySelector('tbody')
      .querySelectorAll('tr');
    const dayEntries = [];
    tableRows.forEach((row) => {
      const key = row.querySelector('time').getAttribute('datetime');
      const value = row.querySelector('.min-max-precipitation').text;
      dayEntries.push({
        [key]: value,
      });
    });
    result[date] = dayEntries;
  }
  return result;
};
