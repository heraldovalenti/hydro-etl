import {fetchForecast} from './fetch';
import {extractRainForecast} from './parse';

export const windyForecast = async ({model}) => {
  const url = models[model];
  const response = await fetchForecast(url);
  return extractRainForecast(response);
};

const models = {
  ecm: 'https://node.windy.com/Zm9yZWNhc3Q/ZWNtd2Y/cG9pbnQvZWNtd2YvdjIuNy8tMjQuNzkwLy02NS40MTA/c291cmNlPWRldGFpbCZzdGVwPTMmdG9rZW49ZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnBZWFFpT2pFMk16TXpOVEF3TWpNc0ltbHVaaUk2ZXlKcGNDSTZJakU0TVM0eE15NHlNak11TWpVaUxDSjFZU0k2SWsxdmVtbHNiR0ZjTHpVdU1DQW9UV0ZqYVc1MGIzTm9PeUJKYm5SbGJDQk5ZV01nVDFNZ1dDQXhNRjh4TlY4M0tTQkJjSEJzWlZkbFlrdHBkRnd2TlRNM0xqTTJJQ2hMU0ZSTlRDd2diR2xyWlNCSFpXTnJieWtnUTJoeWIyMWxYQzg1TkM0d0xqUTJNRFl1TnpFZ1UyRm1ZWEpwWEM4MU16Y3VNellpZlN3aVpYaHdJam94TmpNek5USXlPREl6ZlEuLTNHN1V4eHRMSFY0WHVQV294ejBrMEpKM2RHbk5aT3JYc29CRkVidHBndyZ0b2tlbjI9ZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnRZV2RwWXlJNk1UUTFMQ0pwWVhRaU9qRTJNek16TlRBd01qUXNJbVY0Y0NJNk1UWXpNelV5TWpneU5IMC5wb2F1OTNrMUlYRTJOQV96czRhbWExU2FfSE9wbFUxOWpEa3hLSk5ZRGE0JnVpZD1lZmQzYzg5ZC04ZmQzLTg2M2MtZDMyZC03OTMwYWQxYWJlMzMmc2M9MjAmcHI9MCZ2PTMzLjAuMyZwb2M9Nw',
  gfs: 'https://node.windy.com/Zm9yZWNhc3Q/Z2Zz/cG9pbnQvZ2ZzL3YyLjcvLTI0Ljc5MC8tNjUuNDEwP3NvdXJjZT1kZXRhaWwmc3RlcD0zJnRva2VuPWV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpwWVhRaU9qRTJNek16TlRBd01qTXNJbWx1WmlJNmV5SnBjQ0k2SWpFNE1TNHhNeTR5TWpNdU1qVWlMQ0oxWVNJNklrMXZlbWxzYkdGY0x6VXVNQ0FvVFdGamFXNTBiM05vT3lCSmJuUmxiQ0JOWVdNZ1QxTWdXQ0F4TUY4eE5WODNLU0JCY0hCc1pWZGxZa3RwZEZ3dk5UTTNMak0ySUNoTFNGUk5UQ3dnYkdsclpTQkhaV05yYnlrZ1EyaHliMjFsWEM4NU5DNHdMalEyTURZdU56RWdVMkZtWVhKcFhDODFNemN1TXpZaWZTd2laWGh3SWpveE5qTXpOVEl5T0RJemZRLi0zRzdVeHh0TEhWNFh1UFdveHowazBKSjNkR25OWk9yWHNvQkZFYnRwZ3cmdG9rZW4yPWV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUp0WVdkcFl5STZNVFExTENKcFlYUWlPakUyTXpNek5UQXdNalFzSW1WNGNDSTZNVFl6TXpVeU1qZ3lOSDAucG9hdTkzazFJWEUyTkFfenM0YW1hMVNhX0hPcGxVMTlqRGt4S0pOWURhNCZ1aWQ9ZWZkM2M4OWQtOGZkMy04NjNjLWQzMmQtNzkzMGFkMWFiZTMzJnNjPTIwJnByPTAmdj0zMy4wLjMmcG9jPTg',
  ico: 'https://node.windy.com/Zm9yZWNhc3Q/aWNvbg/cG9pbnQvaWNvbi92Mi43Ly0yNC43OTAvLTY1LjQxMD9zb3VyY2U9ZGV0YWlsJnN0ZXA9MyZ0b2tlbj1leUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcFlYUWlPakUyTXpNek5UQXdNak1zSW1sdVppSTZleUpwY0NJNklqRTRNUzR4TXk0eU1qTXVNalVpTENKMVlTSTZJazF2ZW1sc2JHRmNMelV1TUNBb1RXRmphVzUwYjNOb095QkpiblJsYkNCTllXTWdUMU1nV0NBeE1GOHhOVjgzS1NCQmNIQnNaVmRsWWt0cGRGd3ZOVE0zTGpNMklDaExTRlJOVEN3Z2JHbHJaU0JIWldOcmJ5a2dRMmh5YjIxbFhDODVOQzR3TGpRMk1EWXVOekVnVTJGbVlYSnBYQzgxTXpjdU16WWlmU3dpWlhod0lqb3hOak16TlRJeU9ESXpmUS4tM0c3VXh4dExIVjRYdVBXb3h6MGswSkozZEduTlpPclhzb0JGRWJ0cGd3JnRva2VuMj1leUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKdFlXZHBZeUk2TVRRMUxDSnBZWFFpT2pFMk16TXpOVEF3TWpRc0ltVjRjQ0k2TVRZek16VXlNamd5TkgwLnBvYXU5M2sxSVhFMk5BX3pzNGFtYTFTYV9IT3BsVTE5akRreEtKTllEYTQmdWlkPWVmZDNjODlkLThmZDMtODYzYy1kMzJkLTc5MzBhZDFhYmUzMyZzYz0yMCZwcj0wJnY9MzMuMC4zJnBvYz0z',
  mbl: 'https://node.windy.com/Zm9yZWNhc3Q/bWJsdWU/cG9pbnQvbWJsdWUvdjIuNy8tMjQuNzkwLy02NS40MTA/c291cmNlPWRldGFpbCZzdGVwPTMmdG9rZW49ZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnBZWFFpT2pFMk16TXpOVEF3TWpNc0ltbHVaaUk2ZXlKcGNDSTZJakU0TVM0eE15NHlNak11TWpVaUxDSjFZU0k2SWsxdmVtbHNiR0ZjTHpVdU1DQW9UV0ZqYVc1MGIzTm9PeUJKYm5SbGJDQk5ZV01nVDFNZ1dDQXhNRjh4TlY4M0tTQkJjSEJzWlZkbFlrdHBkRnd2TlRNM0xqTTJJQ2hMU0ZSTlRDd2diR2xyWlNCSFpXTnJieWtnUTJoeWIyMWxYQzg1TkM0d0xqUTJNRFl1TnpFZ1UyRm1ZWEpwWEM4MU16Y3VNellpZlN3aVpYaHdJam94TmpNek5USXlPREl6ZlEuLTNHN1V4eHRMSFY0WHVQV294ejBrMEpKM2RHbk5aT3JYc29CRkVidHBndyZ0b2tlbjI9ZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnRZV2RwWXlJNk1UUTFMQ0pwWVhRaU9qRTJNek16TlRBd01qUXNJbVY0Y0NJNk1UWXpNelV5TWpneU5IMC5wb2F1OTNrMUlYRTJOQV96czRhbWExU2FfSE9wbFUxOWpEa3hLSk5ZRGE0JnVpZD1lZmQzYzg5ZC04ZmQzLTg2M2MtZDMyZC03OTMwYWQxYWJlMzMmc2M9MjAmcHI9MCZ2PTMzLjAuMyZwb2M9OQ',
};
