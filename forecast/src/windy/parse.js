export const extractRainForecast = (windyJson) => {
  const result = {};
  const {data} = JSON.parse(windyJson);
  const {day, hour, mm} = data;
  for (let i = 0; i < mm.length; i++) {
    const dayKey = day[i];
    const dayEntries = result[dayKey] || [];
    const currentHour = `${hour[i]}:00`;
    const currentMm = `${mm[i]}`;
    dayEntries.push({[currentHour]: currentMm});
    result[dayKey] = dayEntries;
  }
  return result;
};
