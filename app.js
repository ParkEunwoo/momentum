const time = document.getElementById('time');

function setTime(){
    time.innerHTML = (new Date()).toJSON().split('T').pop().slice(0, 8);
}

setInterval(setTime, 1000);

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
        let icon_class = 'mdi-weather-';
        switch(icon){
            case 'Mist' : icon_class += 'pouring'; break;
            case 'Sunny' : icon_class += 'sunny'; break;
            case 'Cloudy' : icon_class += 'cloudy'; break;
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