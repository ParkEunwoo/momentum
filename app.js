const icon = document.getElementById("icon");
const temp = document.getElementById("temp");
const place = document.getElementById("place");
const time = document.getElementById("time");
const name = document.getElementById("name");
const input = document.getElementById("input_name");

function showTime(){
    const now = new Date();
    time.innerText = now.toLocaleTimeString().slice(3);
    
}


setInterval(showTime,1000);

input.onchange = function(){
    console.log(input.value);
    localStorage.setItem("name",input.value);
    showName();
}

name.onclick = function(){
    input.style.display='inline-block';
    input.value=name.innerText;
    name.style.display='none';
}

function showName(){
    name.style.display='inline-block';
    name.innerText = localStorage.getItem("name");
    input.style.display ='none';

}

showName();


navigator.geolocation.getCurrentPosition(position=>getWeather(position.coords),e=>console.log(e,message))

async function getWeather({latitude,longitude}){
    console.log(latitude,longitude)
    const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=2313f72f528ba9b181f713691469a1df&units=metric`);
    const json = await result.json();

    temp.innerHTML = json.main.temp + '℃';
    place.innerHTML = json.name;

    data = result.json();
    temp.innerText = data.main.temp + "ºC";
    place.innerText = data.name;

    switch(weather){
        case 'Thunderstorm' : icon_class = 'mdi-weather-lightning'; break;
        case 'Rain' :
        case 'Drizzle' : icon_class = 'mdi-weather-pouring'; break;
        case 'Snow': icon_class = 'mdi-weather-snowy'; break;
        case 'Clear': icon_class = 'mdi-weather-sunny'; break;
        case 'Clouds': icon_class = 'mdi-weather-cloudy'; break;
        case 'Mist': 
        default: icon_class = 'mdi-weather-fog'; break;
    }

    icon.classList.add(className);
}




