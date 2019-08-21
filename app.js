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