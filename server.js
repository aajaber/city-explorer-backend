"use strict";

require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
app.use(cors());

require("dotenv").config();

const PORT = process.env.PORT;

// const weather = require('./data/weather.json');
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
//================== Forecast Class

class Forecast {
  constructor(date, description) {
    this.date = date;
    this.description = description;
  }
}

//================== Movies Class :
class Movies {
  constructor(title, overview, vote, count, image, popularity, release_date) {
    this.title = title;
    this.overview = overview;
    this.vote = vote;
    this.count = count;
    this.img = image;
    this.popularity = popularity;
    this.release_date = release_date;
  }
}

//================== API END-POINT

app.get("/weather", async (request, response) => {
  let city_name = request.query.city;
  // let long = request.query.long;
  // let lat = request.query.lat;

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
});

//============================== Movies method :

const MOVIES_API_KEY = process.env.MOVIES_API_KEY;

app.get("/movies", async (request, response) => {
 
  const city_name = request.query.query;

  
  const movie = "https://api.themoviedb.org/3/search/movie";
  const moviesLink = await axios.get(
    `${movie}?query=${city_name}&api_key=${MOVIES_API_KEY}`
  );

 

  // response.json("error: Something went wrong.");
  if (city_name) {
    // console.log("hello",WEATHER_API_KEY);
    // // console.log(returnArray);
    let moviesArray = moviesLink.data.results.map((item) => {
     
      return new Movies(
        item.title,
        item.overview,
        item.vote,
        item.count,
        item.image,
        item.popularity,
        item.release_date
      );
    });

    if (moviesArray.length) {
      response.json(moviesArray);
    } else {
      response.send("error:404.");
    }
  } else {
    response.json("Error getting data from movies site");
  }
});

// a server endpoint
app.get(
  "/", // our endpoint name
  function (req, res) {
    // callback function of what we should do with our request
    res.send("Hello World =="); // our endpoint function response
  }
);

// app.listen(8080) //

app.listen(PORT, () => {
  console.log(`server on port ${PORT}`);
});
