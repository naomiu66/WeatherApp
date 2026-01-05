import styled from "styled-components";
import type { WeatherCardProps } from "../types/components/WeatherCardProps";

const WeatherCard = ({ weatherData }: WeatherCardProps) => {
  return (
    <StyledWrapper>
      <div className="card">
        <div className="head">
          {weatherData.city.name}, {weatherData.city.country}
        </div>

        <div className="weatherRow">
          <img className="icon" src={weatherData.weather.icon} alt="weather icon" />
          <p className="tempDesc">
            <span className="temp">{weatherData.weather.temp.toFixed()}°</span>{" "}
            <span className="description">{weatherData.weather.description}</span>
          </p>
        </div>

        <div className="extra">
          <div>
            <span>Feels Like:</span> {weatherData.weather.feelsLike.toFixed()}°
          </div>
          <div>
            <span>Humidity:</span> {weatherData.weather.humidity}%
          </div>
          <div>
            <span>Pressure:</span> {weatherData.weather.pressure} hPa
          </div>
          <div>
            <span>Wind:</span> {weatherData.weather.windSpeed.toFixed()} km/h
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    font-family: Montserrat, sans-serif;
    width: 360px;
    padding: 15px;
    background: #4ade80;
    color: #000;
    border: 6px solid #000;
    box-shadow: 12px 12px 0 #000;
    transition: all 0.3s ease;
    cursor: pointer;
  }

  .card:hover {
    transform: translate(-6px, -6px);
  }

  .head {
    font-size: 18px;
    font-weight: 900;
    color: #000;
    padding: 5px 10px;
    border-bottom: 3px solid #000;
    margin-bottom: 10px;
  }

  .weatherRow {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 10px;
  }

  .icon {
    width: 60px;
    height: 60px;
  }

  .tempDesc {
    font-size: 20px;
    font-weight: 700;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
  }

  .temp {
    font-size: 28px;
    font-weight: 900;
  }

  .description {
    font-size: 18px;
    font-weight: 600;
  }

  .minmax {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    padding: 0 10px;
  }

  .min,
  .max {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
  }

  .min span:first-child,
  .max span:first-child {
    font-weight: 600;
    color: #000;
  }

  .min span:last-child,
  .max span:last-child {
    font-weight: 700;
    color: #222;
  }

  .max {
    border-left: 2px solid #000;
    padding-left: 10px;
  }

  .extra {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    font-size: 12px;
    font-weight: 600;
  }

  .extra div span {
    font-weight: 700;
  }
`;

export default WeatherCard;
