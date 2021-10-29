// github으로 날짜에 맞춰 업로드된 거 따라가면됨. 
// 이제 주석으로 안남기고 그냥 깃헙에 올린 뒤 지울거임.
const loginForm = document.querySelector("#login-form");
const loginInput = loginForm.querySelector("input");
const loginButton = loginForm.querySelector("button");
const link = document.querySelector("a");

function onLoginSubmit(){
}
loginButton.addEventListener("submit",onLoginSubmit);

function handleLinkClick(event){
    // alert("alert는 특이해서 실행시키면 페이지 넘어가려던것도 막아선다. 그리고 확인을 누르면 하려던 일을 마저한다.");
    event.preventDefault();
    console.dir(event);
}
link.addEventListener("click",handleLinkClick);
