import React from 'react';

function degreeSymbol() { return '\u00B0'; }

export default function WeatherCard({ weather, units = 'metric' }) {
  if (!weather) return null;

  const name = `${weather.name}${weather.sys?.country ? ', ' + weather.sys.country : ''}`;
  const temp = Math.round(weather.main?.temp);
  const humidity = weather.main?.humidity;
  const description = weather.weather?.[0]?.description || '';
  const icon = weather.weather?.[0]?.icon;
  const wind = weather.wind?.speed;

  
  const iconUrl = icon ? `https://openweathermap.org/img/wn/${icon}@2x.png` : null;

  return (
    <div className="weather-card">
      <div className="weather-top">
        <div className="location">{name}</div>
        {iconUrl && <img src={iconUrl} alt={description} className="weather-icon" />}
      </div>

      <div className="weather-main">
        <div className="temp">
          {temp}{degreeSymbol()}{units === 'metric' ? 'C' : 'F'}
        </div>
        <div className="desc">{description}</div>
      </div>

      <div className="weather-meta">
        <div>Humidity: <strong>{humidity}%</strong></div>
        <div>Wind: <strong>{wind} {units === 'metric' ? 'm/s' : 'mph'}</strong></div>
      </div>
    </div>
  );
}
