import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { WEATHER_API_URL, WEATHER_API_KEY } from "../api";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = (inputValue) => {
    if (inputValue.length === 0) inputValue = 'a';
    return fetch(
      `${WEATHER_API_URL}/search.json?key=${WEATHER_API_KEY}&q=${inputValue}`
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.map((city) => {
            return {
              value: `${city.lat} ${city.lon}`,
              label: `${city.name}, ${city.country}`,
            };
          }),
        };
      });
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };
  
  return (
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};

export default Search;