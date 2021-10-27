import {
  CITY_CAFAYATE,
  CITY_METAN,
  CITY_MOLDES,
  CITY_SALTA,
  WINDY_MODEL_ECM,
  WINDY_MODEL_GFS,
  WINDY_MODEL_ICO,
  WINDY_MODEL_MBL,
} from './config';
import {normalizeForecast} from './normalize';
import {windyForecast} from './windy';
import {yrForecast} from './yr';

export const forecasts = async (_req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  try {
    const cityResults = await Promise.all([
      callForecastProviders(CITY_SALTA),
      callForecastProviders(CITY_METAN),
      callForecastProviders(CITY_MOLDES),
      callForecastProviders(CITY_CAFAYATE),
    ]);
    res.set('Content-Type', 'application/json');
    res.send([
      ...cityResults[0],
      ...cityResults[1],
      ...cityResults[2],
      ...cityResults[3],
    ]);
  } catch (e) {
    const statusCode = e.statusCode ? e.statusCode : 500;
    console.warn(`Error during forecast execution: ${JSON.stringify(e)}`);
    res.status(statusCode).send(JSON.stringify(e));
  }
};

const callForecastProviders = async (city) => {
  const results = await Promise.all([
    yrForecast(city),
    windyForecast({model: WINDY_MODEL_ECM, city}),
    windyForecast({model: WINDY_MODEL_GFS, city}),
    windyForecast({model: WINDY_MODEL_ICO, city}),
    windyForecast({model: WINDY_MODEL_MBL, city}),
  ]);
  const forecasts = [
    normalizeForecast(city, 'yr', results[0]),
    normalizeForecast(city, 'windy-ecm', results[1]),
    normalizeForecast(city, 'windy-gfs', results[2]),
    normalizeForecast(city, 'windy-ico', results[3]),
    normalizeForecast(city, 'windy-mbl', results[4]),
  ];
  return forecasts;
};
