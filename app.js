const express = require("express");
const fetch = require('node-fetch');
const app = express();
const Datastore = require("nedb");
const envKey = require('dotenv').config();

let db = new Datastore({filename: 'weatherDB.db',  autoload: true});

app.use(express.static('public'));
app.use(express.json());


const weather_key = process.env.WEATHER_KEY;
const air_key = process.env.AIR_KEY;

app.get('/weather/:lat/:lon', async (req, res)=>{
    let lat = req.params.lat;
    let lon = req.params.lon;
   
    let weather_endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${weather_key}`;
    let air_endpoint = `http://api.airvisual.com/v2/nearest_city?lat=${lat}&lon=${lon}&key=${air_key}`;


    console.log(air_endpoint);
    let weatherData = await fetch(weather_endpoint);
    let weatherJson = await weatherData.json();

    let airData = await fetch(air_endpoint);
    let airJson = await airData.json();

    let weatherObject = {  
        lat: lat,
        lon: lon,
        city: weatherJson.name,
        temp: weatherJson.main.temp,
        icon: weatherJson.weather[0].icon,
        airQuality: airJson.data.current.pollution.aqius

    }

    db.insert(weatherObject, ()=> console.log(`Data Inserted into weatherDB.db: ${weatherObject}`));

    res.json(weatherObject);
    

});

app.get("/weatherDB", (req,res)=>{

    db.find({}, (err, docs)=>{res.json(docs)});


});

let port = process.env.port || 3000;

app.listen(port, ()=> console.log("Server started on port 3000"));