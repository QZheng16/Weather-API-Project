const express = require("express");
const fetch = require('node-fetch');

const app = express();

app.use(express.static('public'));
app.use(express.json());


const weather_key = "34491f9ae08e962f817ad2f82e9211d1";
const air_key = "b7a5ca53-c04e-4109-854f-74c5b5ead214";




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

    console.log(        {  
        city: weatherJson.name,
        temp: weatherJson.main.temp,
        icon: weatherJson.weather[0].icon,
        airQuality: airJson.data.current.pollution.aqius

        });



    res.json(
        {  
        city: weatherJson.name,
        temp: weatherJson.main.temp,
        icon: weatherJson.weather[0].icon,
        airQuality: airJson.data.current.pollution.aqius

        });
    

});











app.listen(3000, ()=> console.log("Server started on port 3000"));