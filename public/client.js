

let geoObject = {
    lat: 0,
    lon: 0
}

document.getElementById("lat").innerText = geoObject.lat;
document.getElementById("lon").innerText = geoObject.lon;



document.getElementById("submit").onclick = ()=>{


    navigator.geolocation.getCurrentPosition( async geoData=>{
       
        geoObject.lat = geoData.coords.latitude;
        geoObject.lon = geoData.coords.longitude;

        let response = await fetch(`/weather/${geoObject.lat}/${geoObject.lon}`);
        let resJson = await response.json();
        console.log(resJson);
        
        document.getElementById("lat").innerText = geoObject.lat;
        document.getElementById("lon").innerText = geoObject.lon;

        let location = document.querySelectorAll("h2");
        location[0].innerText = resJson.city;

        let weather = document.querySelectorAll("h3");
        weather[0].innerText = resJson.temp + "°F";

        let airQuality = document.querySelectorAll("h3");
        airQuality[1].innerText = resJson.airQuality;

        let weatherIcon = document.querySelectorAll("img");
        weatherIcon[0].src = `http://openweathermap.org/img/wn/${resJson.icon}@2x.png`;
        console
       });
    
}

