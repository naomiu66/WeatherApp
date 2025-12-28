const GEO_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo/locations";
const GEO_API_KEY = process.env.GEO_API_KEY

const getCityByCoords = async (lat, lon) => {
  try {
    const latSign = lat >= 0 ? "+" : "-";
    const lonSign = lon >= 0 ? "+" : "-";

    const latFixed = Math.abs(lat).toFixed(4);
    const lonFixed = Math.abs(lon).toFixed(4);

    const locationParam = `${latSign}${latFixed}${lonSign}${lonFixed}`;

    const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/locations/${locationParam}/nearbyCities?limit=1`;


    const res = await fetch(url, {
      headers: {
        "X-RapidAPI-Key": GEO_API_KEY,
        "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
      },
    });

    if (!res.ok) {
      const errData = await res.text();
      throw new Error(`GeoDB error: ${res.status} - ${errData}`);
    }

    const data = await res.json();
    const city = data.data?.[0];

    if (!city) return null;

    return {
      name: city.city,
      country: city.country,
      region: city.region,
      population: city.population,
    };
  } catch (err) {
    console.error("GeoDB fetch error:", err.message);
    return null;
  }
};

module.exports = { getCityByCoords };
