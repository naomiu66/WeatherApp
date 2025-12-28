const WIKI_URL = "https://en.wikipedia.org/api/rest_v1/page/summary";

const getCityDescription = async (city, country) => {
  try {

    const query = city;

    const response = await fetch(`${WIKI_URL}/${encodeURIComponent(query)}`);

    const data = await response.json();
    console.log(data);

    if (data.type === "disambiguation") return null;

    return data.extract;
  } catch (error) {
    return null;
  }
};

module.exports = {
  getCityDescription,
};
