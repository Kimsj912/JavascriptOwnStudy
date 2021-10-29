const loginForm = document.querySelector("#login-form");
const loginInput = loginForm.querySelector("input");
const loginButton = loginForm.querySelector("button");
const link = document.querySelector("a");

function onLoginSubmit(){
    // html을 이용해 막았음.
    // const username = loginInput.value;
    // if(username=="") alert("please write your name");
    // else if(username.length>15) alert("your name is too long.");
}
loginButton.addEventListener("submit",onLoginSubmit);

function handleLinkClick(event){
    // alert("alert는 특이해서 실행시키면 페이지 넘어가려던것도 막아선다. 그리고 확인을 누르면 하려던 일을 마저한다.");
    event.preventDefault();
    console.dir(event);
}
link.addEventListener("click",handleLinkClick);
