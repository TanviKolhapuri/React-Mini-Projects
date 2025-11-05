import { useState, useEffect, useRef } from 'react';

/**
 * useFetchWeather(city, units)
 * - returns { data, loading, error }
 * - expects REACT_APP_OPENWEATHER_KEY in env
 */
export default function useFetchWeather(city, units = 'metric') {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const controllerRef = useRef(null);

  useEffect(() => {
    if (!city) {
      setData(null);
      setError(null);
      setLoading(false);
      return;
    }

    const key = process.env.REACT_APP_OPENWEATHER_KEY;
    if (!key) {
      setError('Missing OpenWeather API key (set REACT_APP_OPENWEATHER_KEY in .env.local)');
      return;
    }

    const controller = new AbortController();
    controllerRef.current = controller;

    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      setData(null);

      const q = encodeURIComponent(city);
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${q}&units=${units}&appid=${key}`;

      try {
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) {
          // try to parse message from API
          const body = await res.json().catch(() => ({}));
          const msg = body.message || `Error ${res.status}`;
          throw new Error(msg);
        }
        const json = await res.json();
        setData(json);
      } catch (err) {
        if (err.name === 'AbortError') return; // ignore aborts
        setError(err.message || 'Failed to fetch weather');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();

    return () => {
      controller.abort();
    };
  }, [city, units]);

  return { data, loading, error };
}
