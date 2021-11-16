function onGeoOk(pos){
    const lat = pos.coords.latitude //경도
    const lng = pos.coords.longitude; //위도
    console.log("you live in "+lat+" "+lng);
    // 경도, 위도, api key는 기본으로 받고, unit은 온도 단위를 설정하는 것임(기본이 화씨임)
    let url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${WEATHER_API_KEY}&units=metric`;
    console.log(url);
    // fetch : 실제 url에 갈 필요없이 javascript를 이용해 대리로 URL을 부른다.
    // 응답온걸 json으로 변경하고, 이 과정이 성공하면 배열로 된 data에서 name과 메인 날씨 정보를 가져온다.
    fetch(url).then(res => res.json()).then(data=>{
        const weatherContainer = document.querySelector("#weather span:first-child");
        const cityContainer = document.querySelector("#weather span:last-child");

        const name = data.name;
        const weather = data.weather[0].main;

        weatherContainer.innerText = weather;
        cityContainer.innerText = name;

        console.log(data.name, data.weather[0].main);
    });
}
function onGeoError(){
    alert("Can't find you. No weather for you.")
}

navigator.geolocation.getCurrentPosition(onGeoOk,onGeoError);