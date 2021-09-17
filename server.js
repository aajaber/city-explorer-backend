"use strict";

require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
app.use(cors());

require("dotenv").config();

const PORT = process.env.PORT;
const weather = require("./controller/weatherController");
const movies = require("./controller/moviesController");

app.get("/weather", weather);
app.get("/movies", movies);

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
