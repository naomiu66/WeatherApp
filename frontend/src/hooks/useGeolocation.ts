import { useEffect, useState } from "react";
import type { Coords } from "../types/Coords";

export const useGeolocation = () => {
  const [coords, setCoords] = useState<Coords | null>(null);
  const [loadingLocation, setLoadingLocation] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLoadingLocation(false);
      },
      () => {
        setError("Permission denied");
        setLoadingLocation(true);
      }
    );
  }, []);

  return {coords, loadingLocation, error}
};
