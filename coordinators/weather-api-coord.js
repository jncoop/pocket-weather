import { API_KEY } from "../utils/OpenWeatherAPIKey";

export const fetchGeoCode = async (locationName) => {
  const geoCodeURL = `http://api.openweathermap.org/geo/1.0/direct?q=${locationName}&appid=${API_KEY}`;

  try {
    const response = await fetch(geoCodeURL);
    return await response.json();
  } catch (err) {
    console.error("Error getGeoCode ", err);
    throw "Error getting geo code";
  }
};

export const fetchForecast = async (location) => {
  if (!location.lat || !location.lon) {
    throw "Error fetching forecast with geo codes";
  }

  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lon}&exclude=minutely,hourly&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(url);

    return await response.json();
  } catch (err) {
    console.error("Error fetchForecast", err);
    throw "Error fetching forecast";
  }
};
