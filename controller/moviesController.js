const axios = require("axios");
const { request, response } = require("express");
require("dotenv").config();

const MOVIES_API_KEY = process.env.MOVIES_API_KEY;
const Movies = require("../models/moviesModel");

const getMovies = async (request, response) => {
  const city_name = request.query.query;

  const movie = "https://api.themoviedb.org/3/search/movie";
  const moviesLink = await axios.get(
    `${movie}?query=${city_name}&api_key=${MOVIES_API_KEY}`
  );

  if (city_name) {
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
};

module.exports = getMovies;
