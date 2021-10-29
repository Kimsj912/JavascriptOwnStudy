// github으로 날짜에 맞춰 업로드된 거 따라가면됨. 
// 이제 주석으로 안남기고 그냥 깃헙에 올린 뒤 지울거임.
const loginForm = document.querySelector("#login-form");
const loginInput = loginForm.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

function onLoginSubmit(event){
    // initialize setting
    event.preventDefault();

    // remove loginform
    loginForm.classList.add(HIDDEN_CLASSNAME);
    
    // get username and  show greeting message
    const username = loginInput.value;
    localStorage.setItem(USERNAME_KEY,username);
    paintGreeting(username);
}

function paintGreeting(username){
    // show the greeting message
    greeting.classList.remove(HIDDEN_CLASSNAME);
    greeting.innerText=`Hello ${username}`;
}

// Determine visible elements based on user name
const savedUsername = localStorage.getItem(USERNAME_KEY);
if(savedUsername===null) {
    // show the form
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    loginForm.addEventListener("submit",onLoginSubmit);
} else{
    paintGreeting(savedUsername);
}