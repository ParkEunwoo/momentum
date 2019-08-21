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