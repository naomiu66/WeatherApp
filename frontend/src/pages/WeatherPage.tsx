import { useState } from "react";
import { weatherApi } from "../api/weatherApi";
import Input from "../components/Input";
import Loader from "../components/Loader";
import type { WeatherApiResponse } from "../types/api/WeatherApiResponse";
import WeatherCard from "../components/WeatherCard";
import "../styles/WeatherPage.css";
import SourceCodeButton from "../components/SourceCodeButton";
import WeatherMap from "../components/WeatherMap";
import NewsLetterCard from "../components/NewsLetterCard";
import ContentContainerCard from "../components/ContentContainerCard";
import TypeWriterLoader from "../components/TypeWriterLoader";

const WeatherPage = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError("Enter city name");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await weatherApi.getWeatherByCity(city);
      setWeather(data);
    } catch {
      setError("City not found");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSourceCodeButton = () => {
    window.open("https://github.com");
  };

  //   if(loading) return <Loader/>

  return (
    <div className="main">
      {/* <div className="logoContainer">
        <h1>WeatherApp</h1>
     </div> */}

      <div className="headerContainer">
        <div className="rowContainer">
          <Input value={city} onChange={setCity} onEnter={fetchWeather} />
          <button className="button" onClick={fetchWeather}>
            Search
          </button>
        </div>
        <div>
          <SourceCodeButton onClick={handleSourceCodeButton} />
        </div>
      </div>

      {error && <p className="error">{error}</p>}

      {!loading && !weather && <TypeWriterLoader />}

      {loading && <Loader />}

      {weather && !loading && (
        <ContentContainerCard title="Weather Info">
          <div className="weatherContainer">
            <div className="weatherCard">
              <WeatherCard weatherData={weather}></WeatherCard>
            </div>

            {weather.tip && (
              <div className="tipsCard">
                <NewsLetterCard
                  text={weather.tip}
                  title="TIPS"
                  variant="pink"
                />
              </div>
            )}

            <div className="weatherMapWrapper">
              <WeatherMap lat={weather.weather.lat} lon={weather.weather.lon} />
            </div>
          </div>
        </ContentContainerCard>
      )}

      {weather?.city && !loading && (
        <ContentContainerCard title="Extra Info">
          <div className="extraInfo">
            <NewsLetterCard
              title="CITY INFO"
              text={`${weather.city.country},${weather.city.name},${weather.city.region}. Population: ${weather.city.population}`}
            />
            <NewsLetterCard title="DESCRIPTION" text={weather.description} />
            <NewsLetterCard title="FACT" text={weather.fact} />
          </div>
        </ContentContainerCard>
      )}
    </div>
  );
};

export default WeatherPage;
