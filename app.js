const time = document.getElementById("time");
const icon = document.getElementById("icon");
const place = document.getElementById("place");
const weather = document.getElementById("weather");
const input_name = document.getElementById("input_name");

function showTime(){
    const now = new Date();
    time.innerText = now.toLocaleTimeString().slice(3);
}

setInterval (showTime, 1000);