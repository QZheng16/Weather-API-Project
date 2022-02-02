let geoObject = {
    lat: 0,
    lon: 0
}

document.getElementById("lat").innerText = geoObject.lat;
document.getElementById("lon").innerText = geoObject.lon;

// MAP Setup
let map = L.map("weatherMap", {
    zoomDelta: 1,
    zoomSnap: .3
}).setView([geoObject.lat, geoObject.lon], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18,
    id: 'openStreetMap',
    tileSize: 512,
    zoomOffset: -1
}).addTo(map);

document.getElementById("submit").onclick = () => {


    navigator.geolocation.getCurrentPosition(async geoData => {

        geoObject.lat = geoData.coords.latitude;
        geoObject.lon = geoData.coords.longitude;

        let response = await fetch(`/weather/${geoObject.lat}/${geoObject.lon}`);
        let resJson = await response.json();
        console.log(resJson);

        document.getElementById("lat").innerText = geoObject.lat.toFixed(2);
        document.getElementById("lon").innerText = geoObject.lon.toFixed(2);

        let location = document.querySelectorAll("h2");
        location[0].innerText = resJson.city;

        let weather = document.querySelectorAll("h3");
        weather[0].innerText = resJson.temp + "°F";

        let airQuality = document.querySelectorAll("h3");
        airQuality[1].innerText = "AQI: " + resJson.airQuality;

        let weatherIcon = document.querySelectorAll("img");
        weatherIcon[0].src = `http://openweathermap.org/img/wn/${resJson.icon}@2x.png`;


    });

}

document.getElementById("map").onclick = async ()=>{

    let dbRes = await fetch("/weatherDB");
    let dbRes_Json = await dbRes.json();

    dbRes_Json.forEach((element,index)=>{
        console.log(element.city);

        map.setView([element.lat, element.lon], 1);

        var marker = L.marker([element.lat, element.lon]).addTo(map)
            .bindPopup(`City:${element.city}<br> Temperature:${element.temp}°F <br> Air Quality:${element.airQuality}`)
            .openPopup();



    });



}