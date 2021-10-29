// github으로 날짜에 맞춰 업로드된 거 따라가면됨. 
// 이제 주석으로 안남기고 그냥 깃헙에 올린 뒤 지울거임.
const loginForm = document.querySelector("#login-form");
const loginInput = loginForm.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");

const HIDDEN_CLASSNAME = "hidden";

function onLoginSubmit(event){
    // initialize setting
    event.preventDefault();

    // remove loginform
    loginForm.classList.add(HIDDEN_CLASSNAME);
    
    // get username and  show greeting message
    const username = loginInput.value;
    localStorage.setItem("username",username);
    greeting.innerText=`Hello ${username}`;
    greeting.classList.remove(HIDDEN_CLASSNAME);
}
loginForm.addEventListener("submit",onLoginSubmit);
