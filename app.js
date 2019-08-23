const time = document.getElementById("time");
const icon = document.getElementById("icon");
const place = document.getElementById("place");
const weather = document.getElementById("weather");
const input_name = document.getElementById("input_name");
const name = document.getElementById("name");
const figcaption = document.getElementById("figcaption");

function showTime(){
    const now = new Date();
    time.innerText = now.toLocaleTimeString().slice(3);
}

setInterval (showTime, 1000);



input_name.onchange = function(){
console.log(input_name.value);
localStorage.setItem("name",input_name.value);
}

function showName(){
    name.innerText = localStorage.getItem("name");
    input_name.style.display = "none";
    name.style.display = "inline-block";
}

showName();
name.onclick = function(){
    input_name.style.display = "inline-block";
    input_name.value = name.innerText;
    name.style.display = "none";
    
}

function showWeather(){
    navigator.geolocation.getCurrentPosition(function(position){getWeather(position.coords)}, e=>console.log(e.message));
}

function getWeather({latitude, longitude}){
console.log(latitude, longitude);


}

showWeather();



async function getWeather({latitude, longitude}){
    const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=2313f72f528ba9b181f713691469a1df&units=metric`);
    console.log(result);
    const data = await result.json();
}

place.innerText = data.main.name;
figcaption.innerText = data.weather[0].main;

case Mist: icon.classList.add("mdi-weather-fog");
case ThunderStorm : icon.classList.add("mdi-weather-ThunderStorm");


