const API_KEY = process.env.OPEN_WEATHER_API_KEY ?? null;
const URL = "https://api.openweathermap.org/data/2.5/weather";
const URL3 = "https://api.openweathermap.org/data/3.0/weather";
const mapper = require("../utils/mapper");

const getWeatherByCity = async (city) => {
  if (!API_KEY) return null;

  try {
    const params = new URLSearchParams({
      q: city,
      appid: API_KEY,
      units: "metric",
    });
    const response = await fetch(`${URL}?${params.toString()}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const data = await response.json();

    return mapper.mapWeather(data);
  } catch (error) {
    console.error("Error fetching weather with city:", error.message);
  }
};

const getWeatherByCoordinates = async (lat, lon) => {
  if (!API_KEY) return null;

  try {
    const params = new URLSearchParams({
      lat: lat,
      lon: lon,
      appid: API_KEY,
      units: "metric",
    });

    const response = await fetch(`${URL}?${params.toString()}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const data = await response.json();
    return mapper.mapWeather(data);
  } catch (error) {
    console.log("Error fetching weather with coordinates: ", error.message);
  }
};

module.exports = {
  getWeatherByCity,
  getWeatherByCoordinates,
};
