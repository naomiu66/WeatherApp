import type { CityInfo } from "./CityInfo";
import type { Weather } from "./Weather";

export type WeatherApiResponse = {
    weather: Weather;
    city: CityInfo;
    description: string;
    tip: string;
    fact: string;
};