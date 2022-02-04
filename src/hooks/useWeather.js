import { useState } from 'react';

const BASE_URL = 'https://foreca-weather.p.rapidapi.com';

const useWeather = () => {
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [locations, setLocations] = useState(null);

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
        'x-rapidapi-host': 'foreca-weather.p.rapidapi.com',
        'x-rapidapi-key': 'fed2790ad9mshfa53894f83429efp1aa69cjsn9d90c54064ad',
      },
    });

    if (!response.ok) {
      throw new Error('Request failed!');
    }

    const data = await response.json();

    if (!data || data.length === 0) {
      setError('There is no such location');
      setLoading(false);
      return;
    }

    if (data?.locations.length > 5) {
      setLocations(clearData(data?.locations, 5));
    }

    setLocations(clearData(data?.locations, data.length));
  };

  return {
    isError,
    isLoading,
    locations,
    getLocations,
  };
};

export default useWeather;
