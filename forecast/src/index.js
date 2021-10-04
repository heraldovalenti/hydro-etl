import {normalizeForecast} from './normalize';
import {windyForecast} from './windy';
import {yrForecast} from './yr';

export const forecasts = async (_req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  try {
    const result = await callForecastProviders();
    res.set('Content-Type', 'application/json');
    res.send(result);
  } catch (e) {
    const statusCode = e.statusCode ? e.statusCode : 500;
    console.warn(`Error during forecast execution: ${JSON.stringify(e)}`);
    res.status(statusCode).send(JSON.stringify(e));
  }
};

const callForecastProviders = async () => {
  const results = await Promise.all([
    yrForecast(),
    windyForecast({model: 'ecm'}),
    windyForecast({model: 'gfs'}),
    windyForecast({model: 'ico'}),
    windyForecast({model: 'mbl'}),
  ]);
  const forecasts = [
    normalizeForecast('yr', results[0]),
    normalizeForecast('windy-ecm', results[1]),
    normalizeForecast('windy-gfs', results[2]),
    normalizeForecast('windy-ico', results[3]),
    normalizeForecast('windy-mbl', results[4]),
  ];
  return forecasts;
};
