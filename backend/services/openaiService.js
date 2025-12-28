const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const getCityFact = async (city) => {
  try {
    const prompt = `Give short interesting fact about a city ${city}`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 100,
    });

    const message = response.choices[0].message.content;
    return message;
  } catch (error) {
    console.error("Error fetching data from open ai", error);
  }
};

const getWeatherTip = async (weatherInfo) => {
  try {
    const prompt = `Give short tip considering weather with friendly speaking ${weatherInfo}`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 100,
    });

    const message = response.choices[0].message.content;
    return message;
  } catch (error) {
    console.error("Error fetching data from open ai", error);
  }
};

module.exports = {
  getWeatherTip,
  getCityFact
};
