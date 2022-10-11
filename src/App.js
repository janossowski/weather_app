import { useState, useEffect } from "react";
import Search from "./components/search";
import CurrentWeather from "./components/current-weather";
import Forecast from "./components/forecast";
import './App.css';
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [geomap, setGeomap] = useState(null);
  const [search, setSearch] = useState(null);
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
    if (!search) return;
    console.log(search);
    const [newLat, newLon] = search.value.split(" ");
    setLat(newLat);
    setLon(newLon);
    fetch(`${WEATHER_API_URL}/current.json?key=${WEATHER_API_KEY}&q=${search.label}&aqi=no`)
      .then(response => response.json())
      .then(json => setCurrentWeather({ city: search.label, ...json }))
    
    fetch(`${WEATHER_API_URL}/forecast.json?key=${WEATHER_API_KEY}&q=${search.label}&days=7&aqi=no&alerts=no`)
      .then(response => response.json())
      .then(json => setForecast(json))
    }
    fetchData();
  }, [search])

  useEffect(() => {
    setGeomap([lat, lon]);
  }, [lat, lon])

  return (
    <div className="container">
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.1/dist/leaflet.css" />
      <Search onSearchChange={setSearch} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast forecast={forecast} />}
    </div>
  );
}

export default App;
