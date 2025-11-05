import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import WeatherCard from './WeatherCard';
import useFetchWeather from './useFetchWeather';

export default function WeatherApp() {
  // load last city from localStorage if present
  const [city, setCity] = useState(() => localStorage.getItem('weather.lastCity') || '');
  const [units, setUnits] = useState(() => localStorage.getItem('weather.units') || 'metric'); // 'metric' or 'imperial'

  const { data, loading, error } = useFetchWeather(city, units);

  useEffect(() => {
    if (city) localStorage.setItem('weather.lastCity', city);
  }, [city]);

  useEffect(() => {
    localStorage.setItem('weather.units', units);
  }, [units]);

  const handleSearch = (c) => setCity(c);

  return (
    <div className="todo-container"> {/* reuse same container class for theme */}
      <h1 className="title">Weather App</h1>

      <SearchBar onSearch={handleSearch} initialCity={city} />

      <div className="controls" style={{ marginTop: 8 }}>
        <div className="left">{city ? `Showing: ${city}` : 'Search for any city'}</div>

        <div className="filters" role="tablist" aria-label="Units">
          <button className={units === 'metric' ? 'active' : ''} onClick={() => setUnits('metric')}>Celsius</button>
          <button className={units === 'imperial' ? 'active' : ''} onClick={() => setUnits('imperial')}>Fahrenheit</button>
        </div>

        <div className="right" />
      </div>

      <div style={{ marginTop: 12 }}>
        {loading && <p className="empty">Loading…</p>}
        {error && <p className="empty" style={{ color: '#ef4444' }}>Error: {error}</p>}
        {!loading && !error && data && <WeatherCard weather={data} units={units} />}
        {!loading && !error && !data && <p className="empty">No data yet — try searching a city ✨</p>}
      </div>
    </div>
  );
}
