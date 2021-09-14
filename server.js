"use strict";
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

require("dotenv").config();

const PORT = process.env.PORT;

const weather = require("./data/weather.json");


class Forecast {
  constructor(date, description) {
    this.date = date;
    this.description = description;
    Forecast.all.push(this);
  }
}
Forecast.all = [];

app.get(
  "/",
  function (req, res) {
    res.send("Hello World");
  }
);



app.get("/weather", (request, response) => {
  //console.log(request);

  const city_name = request.query.city_name;
  const lon = request.query.lon;
  const lat = request.query.lat;

  if (city_name) {
    const returnArr = weather.find((item) => {
      return item.city_name.toLowerCase() === city_name.toLowerCase();
    });
    let dataArr = returnArr.data.map((value) => {

      return new Forecast(
        ` Low of ${value.low_temp}, high of ${value.high_temp} with ${value.weather.description} `,
        ` ${value.datetime}`
      );
    });
    if (dataArr.length) {
      response.json(dataArr);
      console.log(dataArr)
    } else {
      response.send("the city is not exists");
    }
  } else {

    response.json(weather);
  }
});

app.listen(PORT, () => {
  console.log(`server on port ${PORT}`);
});





// pk.d43cb260885bedf4dc024b0dff365856