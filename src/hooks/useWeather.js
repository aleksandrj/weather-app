import { useState } from 'react';
import config from '../config/config';
import {
  getCurrentDayForecast,
  getWeekForecast,
} from '../helpers/getFormattedData';

const API_HOST = process.env.API_HOST || config.API_HOST;
const API_KEY = process.env.API_KEY || config.API_KEY;
const BASE_URL = process.env.BASE_URL || config.BASE_URL;
const BASE_URL_DB = process.env.BASE_URL || config.BASE_URL_DB;

const useWeather = () => {
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [locations, setLocations] = useState(() => {
    if (localStorage.getItem('previousResults'))
      return JSON.parse(localStorage.getItem('previousResults'));
  });

  const [forecast, setForecast] = useState(null);

  const clearData = (arr, sliceRange) => {
    return arr.slice(0, sliceRange).map((location) => {
      return {
        id: location.id,
        city: location.name,
        country: location.country,
      };
    });
  };

  const getLocations = async (location) => {
    // Can be separated for unique messages (return concatenated string)
    if (location.length > 30 || /\d/.test(location)) {
      setError('Input must contain only letters and be <= 30 characters long.');
      return;
    }

    // Log search to DB
    fetch(`${BASE_URL_DB}/api/logs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'SEARCH',
        value: location,
        result: null,
      }),
    });

    setError(false);
    setLoading(true);
    setLocations(null);

    const response = await fetch(`${BASE_URL}/location/search/${location}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': API_HOST,
        'x-rapidapi-key': API_KEY,
      },
    });

    if (!response.ok) {
      setError('Failed to reach data.');
    }

    const data = await response.json();

    if (!data || data.locations?.length === 0) {
      setError('Location was not found.');
      setLoading(false);
      return;
    }

    setError(false);
    let modifiedLocationsArr = null;

    if (data?.locations.length > 5) {
      modifiedLocationsArr = clearData(data.locations, 5);
      setLocations(modifiedLocationsArr);
      localStorage.setItem(
        'previousResults',
        JSON.stringify(modifiedLocationsArr)
      );
      setLoading(false);
      return;
    }

    modifiedLocationsArr = clearData(data.locations, data.length);
    setLocations(modifiedLocationsArr);
    localStorage.setItem(
      'previousResults',
      JSON.stringify(modifiedLocationsArr)
    );

    setLoading(false);
  };

  const getForecast = async (locationId, city, country) => {
    setError(false);
    setLoading(true);
    setLocations(null);

    const response = await Promise.all([
      fetch(`${BASE_URL}/current/${locationId}?tz=Europe%2FVilnius`, {
        method: 'GET',
        headers: {
          'x-rapidapi-host': API_HOST,
          'x-rapidapi-key': API_KEY,
        },
      }),
      fetch(
        `${BASE_URL}/forecast/daily/${locationId}?periods=8&dataset=standard`,
        {
          method: 'GET',
          headers: {
            'x-rapidapi-host': API_HOST,
            'x-rapidapi-key': API_KEY,
          },
        }
      ),
    ]);

    if (!response[0].ok || !response[1].ok) {
      setError('Failed to reach data.');
    }

    const curWeatherData = await response[0].json();
    const forecastedData = await response[1].json();

    if (
      !curWeatherData ||
      curWeatherData.current?.length === 0 ||
      !forecastedData ||
      forecastedData.forecast?.length === 0
    ) {
      setError('No data was found for the selected location.');
      setLoading(false);
      return;
    }

    const cleanCurWeatherData = getCurrentDayForecast(
      curWeatherData.current,
      city,
      country
    );

    // Log click to DB
    fetch(`${BASE_URL_DB}/api/logs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'CLICK',
        value: `${locationId}-${city}`,
        result: JSON.stringify(cleanCurWeatherData),
      }),
    });

    const cleanForecastedData = getWeekForecast(forecastedData.forecast);

    // Data can be "gutted" before setting value
    setForecast({
      current: cleanCurWeatherData,
      forecast: cleanForecastedData,
    });

    setLoading(false);
  };

  return {
    isError,
    isLoading,
    locations,
    forecast,
    getLocations,
    getForecast,
  };
};

export default useWeather;
