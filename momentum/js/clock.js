const clock = document.querySelector("h2#clock");

function getClock(){
    date = new Date();
    clock.innerHTML = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}
getClock();
setInterval(getClock,1000);
