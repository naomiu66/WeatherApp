

const mapWeather = (data) => {
    return mappedData = {
        cityName: data.name,
        countryCode: data.sys.country,
        main: data.weather[0].main,
        description: data.weather[0].description,
        temp: data.main.temp,
        feelsLike: data.main.feels_like,
        tempMin: data.main.temp_min,
        tempMax: data.main.temp_max,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        windSpeed: data.wind.speed,
        lon: data.coord.lon,
        lat: data.coord.lat,
        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    }
}

module.exports = {
    mapWeather
}