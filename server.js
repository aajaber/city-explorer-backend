'use strict'

const express = require('express')
const app = express()
const cors = require('cors');
app.use(cors())

require('dotenv').config();


const PORT = process.env.PORT


// const weather = require('./data/weather.json');
//================== Forecast Class

class Forecast {
    constructor(date, description) {
        this.date = date;
        this.description = description;
        Forecast.all.push(this);
    }
}
Forecast.all = [];



//================== Movies Class :
class Movies {
    constructor(title, overview, vote, count, img,popularity,release_date) {
      this.title = title;
      this.overview = overview;
      this.vote = vote;
      this.count = count;
      this.img = img;
      this.popularity=popularity;
      this.release_date=release_date;
    }
  }


    //================== API END-POINT 


app.get('/weather', (request, response) => {
    let city_name = request.query.city_name;
    let long = request.query.long;
    let lat = request.query.lat;

    //=================== Find method

    const returedArray = weather.find((item) => {
        retrun(item.city_name.toLowerCase() === city_name.toLowerCase());
    });
    
    if (returedArray) {
        let newArray = returedArray.data.map((item) => {
            return new Forecast( item.datetime, item.weather.description);
        })
        response.json(newArray);

        let arr1 = movieResponse.data.results.map((data1) => {
            console.log(data1);
            return new Movies(
              `Title: ${data1.title}`,
              `Overview: ${data1.overview}`,
              `Average votes: ${data1.vote_average}`,
              ` Total Votes: ${data1.vote_count}`,
              `${data1.poster_path}`,
              `popularity:${data1.popularity}`,
              `release_date:${data1.release_date}`
      
            );
    }
    else {
        response.json('data not found')
    }
});

// a server endpoint 
app.get('/', // our endpoint name
    function (req, res) { // callback function of what we should do with our request
        res.send('Hello World ==') // our endpoint function response
    })

// app.listen(8080) //

app.listen(PORT, () => {
    console.log(`server on port ${PORT}`);
});