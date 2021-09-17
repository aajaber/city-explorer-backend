const axios = require("axios");
require("dotenv").config();

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const Forecast = require("../models/weatherModel");

const getWeather = async (request, response) => {
  let city_name = request.query.city;

  const link = "https://api.weatherbit.io/v2.0/forecast/daily";
  const linkResponse = await axios.get(
    `${link}?city=${city_name}&key=${WEATHER_API_KEY}`
  );

  //=================== Find method

  if (city_name) {
    let weatherAraay = linkResponse.data.data.map((item) => {
      return new Forecast(item.weather.description, item.datetime);
    });

    if (weatherAraay.length) {
      response.json(weatherAraay);
      console.log("weatherAraay", weatherAraay);
    } else {
      response.send("No data.");
    }
  } else {
    response.json("Error");
  }
};

module.exports = getWeather;
