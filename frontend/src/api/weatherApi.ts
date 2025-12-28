import type { WeatherApiResponse } from "../types/api/WeatherApiResponse";
import type { Coords } from "../types/Coords";
import { API_BASE_URL, apiCall } from "./http";

export const weatherApi = {
  async getWeatherByCoords(coords: Coords): Promise<WeatherApiResponse> {
    const params = new URLSearchParams({
      lat: String(coords.latitude),
      lon: String(coords.longitude),
    });
    return await apiCall<WeatherApiResponse>(
      `${API_BASE_URL}/api/weather?${params.toString()}`
    );
  },

  async getWeatherByCity(city: string): Promise<WeatherApiResponse> {
    const params = new URLSearchParams({
      city: city
    });
    return await apiCall<WeatherApiResponse>(
      `${API_BASE_URL}/api/weather?${params.toString()}`
    );
  },
};
