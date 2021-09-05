import axios from 'axios';

export const fetchForecast = async () => {
  try {
    const response = await axios.get(
      'https://www.yr.no/en/details/table/2-3838233/Argentina/Salta/Departamento%20Capital/Salta',
    );
    return response.data;
  } catch (e) {
    console.log('Error fetch from YR', e);
  }
};
