const {
  getWeatherByCity,
  getWeatherByCoordinates,
} = require("../services/weatherService");

const { getCityByCoords } = require("../services/geoDbService");
const { getCityDescription } = require("../services/wikiService");
const { getWeatherTip, getCityFact } = require("../services/openaiService");

const getWeather = async (req, res) => {
  try {
    const { city, lat, lon } = req.query;

    let weather;

    if (city) {
      weather = await getWeatherByCity(city);
      if (!weather)
        return res.status(404).json({
          message: "City or weather not found",
        });
    } else if (lat && lon) {
      weather = await getWeatherByCoordinates(lat, lon);
      if (!weather)
        return res.status(404).json({
          message: "Not found weather",
        });
    } else {
      return res.status(400).json({
        message: "Provide city or lat & lon params",
      });
    }

    const cityInfo = await getCityByCoords(weather.lat, weather.lon);

    const description = cityInfo
      ? await getCityDescription(cityInfo.name, cityInfo.country)
      : null;

    const message = `Temp: ${weather.temp}, Feels Like: ${weather.feelsLike}. Wind speed: ${weather.windSpeed}, Description: ${weather.description}`;

    const weatherTip = await getWeatherTip(message);

    const cityFact = cityInfo ? await getCityFact(cityInfo.name) : null;

    return res.json({
      weather,
      city: cityInfo,
      description,
      tip: weatherTip,
      fact: cityFact,
    });
  } catch (err) {
    console.error(`Error in fetching weather data: ${err}`);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  getWeather,
};
