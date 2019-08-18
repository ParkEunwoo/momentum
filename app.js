const time = document.getElementById('time');
const temp = document.getElementById('temp');
const icon = document.getElementById('icon');
const place = document.getElementById('place');
const name = document.getElementById('name');
const input = document.getElementById('input');

function setTime(){
    time.innerHTML = (new Date()).toLocaleTimeString().slice(3);
}

setInterval(setTime, 1000);

function getCat(){
    fetch('https://aws.random.cat/meow')
    .then(result => result.json())
    .then(json => {
        document.body.style.backgroundImage = `url(${json.file})`;
    })
    .catch(e => console.log(e.message));
}
getCat();

navigator.geolocation.getCurrentPosition((position)=>{
    getWeather(position.coords);
}, (e)=>console.log(e));

async function getWeather({latitude, longitude}){
    const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=2313f72f528ba9b181f713691469a1df&units=metric`)

    const json = await result.json();
    
    temp.innerHTML += `<div>${json.main.temp}℃</div>`;
    place.innerHTML += `<div>${json.name}</div>`;

    const main = json.weather.pop().main;
    
    let icon_class;
    
    switch(main){
        case 'Thunderstorm' : icon_class = 'mdi-weather-lightning'; break;
        case 'Rain' :
        case 'Drizzle' : icon_class = 'mdi-weather-pouring'; break;
        case 'Snow': icon_class = 'mdi-weather-snowy'; break;
        case 'Clear': icon_class = 'mdi-weather-sunny'; break;
        case 'Clouds': icon_class = 'mdi-weather-cloudy'; break;
        case 'Mist': 
        default: icon_class = 'mdi-weather-fog'; break;
    }
    icon.classList.add(icon_class);
}

input.onchange = function({target}){
    localStorage.setItem('name', target.value);
    target.style.display = 'none';
    showName();
}

name.onclick = function({target}){
    target.style.display = 'none';
    input.style.display = 'inline-block';
    input.value = target.innerHTML;
}

function showName(){
    const storage = localStorage.getItem('name');
    if(storage){
        name.style.display = 'inline-block';
        name.innerHTML = storage;
        input.style.display = 'none';
    }
}

showName();