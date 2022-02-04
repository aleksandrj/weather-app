import { useState } from 'react';
import config from '../config/config';

const API_HOST = process.env.API_HOST || config.API_HOST;
const API_KEY = process.env.API_KEY || config.API_KEY;
const BASE_URL = process.env.BASE_URL || config.BASE_URL;

const useWeather = () => {
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [locations, setLocations] = useState(() => {
    if (localStorage.getItem('previousResults'))
      return JSON.parse(localStorage.getItem('previousResults'));
  });

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
      return;
    }

    modifiedLocationsArr = clearData(data.locations, data.length);
    setLocations(modifiedLocationsArr);
    localStorage.setItem(
      'previousResults',
      JSON.stringify(modifiedLocationsArr)
    );
    return;
  };

  const getCurrentWeather = async (locationId) => {
    const response = await fetch(`${BASE_URL}/location/search/`, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'foreca-weather.p.rapidapi.com',
        'x-rapidapi-key': 'fed2790ad9mshfa53894f83429efp1aa69cjsn9d90c54064ad',
      },
    });

    if (!response.ok) {
      setError('Failed to reach data.');
    }
  };

  const getForecast = (locationId) => {};

  return {
    isError,
    isLoading,
    locations,
    getLocations,
  };
};

export default useWeather;
