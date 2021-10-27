import axios from 'axios';
import {YR_URLS} from '../config';

export const fetchForecast = async (city) => {
  try {
    const url = YR_URLS[city];
    const response = await axios.get(url);
    return response.data;
  } catch (e) {
    console.log('Error fetch from YR', e);
  }
};
