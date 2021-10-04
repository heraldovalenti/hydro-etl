import axios from 'axios';

export const fetchForecast = async (url) => {
  const result = await axios.get(url);
  const buff = Buffer.from(result.data, 'base64');
  const text = buff.toString('ascii');
  return text;
};
