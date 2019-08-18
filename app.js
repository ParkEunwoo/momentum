const time = document.getElementById('time');

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
    const {latitude, longitude} = position.coords;
    getWeather(latitude, longitude);
}, (e)=>console.log(e));

const weather = document.getElementById('weather');

function getWeather(lat, lng){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=2313f72f528ba9b181f713691469a1df&units=metric`)
    .then(result => result.json())
    .then(json => {
        weather.children[0].children[1].innerHTML += `<div>${json.main.temp}℃</div>`;
        weather.children[1].innerHTML += `<div>${json.name}</div>`;
        return json.weather.pop().main;
    })
    .then(icon => {
        let icon_class;
        switch(icon){
            case 'Thunderstorm' : icon_class = 'mdi-weather-lightning'; break;
            case 'Rain' :
            case 'Drizzle' : icon_class = 'mdi-weather-pouring'; break;
            case 'Snow': icon_class = 'mdi-weather-snowy'; break;
            case 'Clear': icon_class = 'mdi-weather-sunny'; break;
            case 'Clouds': icon_class = 'mdi-weather-cloudy'; break;
            case 'Mist': 
            default: icon_class = 'mdi-weather-fog'; break;
        }
        weather.children[0].children[0].classList.add(icon_class);
    })
    .catch(e => console.log(e));
}

const input = document.getElementById('input');
const name = document.getElementById('name');

input.onchange = function(e){
    localStorage.setItem('name', e.target.value);
    e.target.style.display = 'none';
    showName();
}

name.onclick = function(e){
    e.target.style.display = 'none';
    input.style.display = 'inline-block';
    input.value = e.target.innerHTML;
}

function showName(){
    const n = localStorage.getItem('name');
    if(n){
        name.style.display = 'inline-block';
        name.innerHTML = n;
        input.style.display = 'none';
    }
}

showName();