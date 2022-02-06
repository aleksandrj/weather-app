import moment from 'moment';

const getCurrentDayForecast = (data, city, country) => ({
  weekday: moment(data.time).format('dddd'),
  date: moment(data.time).format('MM/DD'),
  city,
  country,
  conditions:
    data.symbolPhrase.charAt(0).toUpperCase() + data.symbolPhrase.slice(1),
  temperature: data.temperature,
  humidity: data.relHumidity,
  wind: data.windSpeed,
  uvIndex: data.uvIndex,
});

const getWeekForecast = (data) =>
  data.slice(1).map((day) => ({
    weekday: moment(day.date).format('ddd'),
    maxTemp: day.maxTemp,
    minTemp: day.minTemp,
  }));

export { getCurrentDayForecast, getWeekForecast };
