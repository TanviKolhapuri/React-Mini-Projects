import React, { useState } from 'react';

export default function SearchBar({ onSearch, initialCity = '' }) {
  const [city, setCity] = useState(initialCity);

  const submit = (e) => {
    e && e.preventDefault();
    const trimmed = city.trim();
    if (!trimmed) return;
    onSearch(trimmed);
  };

  return (
    <form className="weather-search" onSubmit={submit}>
      <input
        type="text"
        placeholder="Enter city (e.g., London)"
        aria-label="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}
