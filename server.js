'use strict'

const express = require('express')
const app = express()
const cors = require('cors');
app.use(cors())

require('dotenv').config();

const PORT = process.env.PORT


const weather = require('./data/weather.json');
const { response } = require('express');
//================== Forecast Class

class Forecast {
    constructor(date, description) {
        this.date = date;
        this.description = description;
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
    }
    else {
        response.json('data not found')
    }
});






// a server endpoint 
app.get('/', // our endpoint name
    function (req, res) { // callback function of what we should do with our request
        res.send('Hello World ====================================') // our endpoint function response
    })

// app.listen(8080) //

app.listen(PORT, () => {
    console.log(`server on port ${PORT}`);
});