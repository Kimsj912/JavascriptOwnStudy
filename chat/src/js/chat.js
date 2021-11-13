"use strict" // js의 오류를 줄여나가는 방향

// socket io불러오기
const socket = io();

const nickname = document.querySelector("#nickname");
const chatList = document.querySelector(".chatting-list");
const chatInput = document.querySelector(".chatting-input");
const sendButton = document.querySelector(".send-button");
const displayContainer = document.querySelector(".display-container");

chatInput.addEventListener("keypress",(e)=>{
    if(e.keyCode===13) send();
});

function send(){
    const param = {
        name : nickname.value,
        msg : chatInput.value,
    }
    socket.emit("chatting", param); // 채널아이디, 내용 객체를 담아 소켓으로 보냄.
}

// event  - post msgs
sendButton.addEventListener("click",send);

//  get  msgs
socket.on("chatting",(data)=>{
    console.log(data);
    const {name, msg, time} = data;
    const item = new LiModel(name, msg, time);
    item.makeLi();
    displayContainer.scrollTo(0,displayContainer.scrollHeight);
    
})

function LiModel(name, msg, time){
    this.name= name;
    this.msg = msg;
    this.time = time;

    this.makeLi = ()=>{
        const li = document.createElement("li");
        li.classList.add(nickname.value === this.name ? "sent": "receive");
        const dom = 
        `<span class='profile'>
            <span class="user">${this.name}</span>
            <img class="image" src="https://placeimg.com/50/50/any" alt="any">
        </span>
        <span class="message">${this.msg}</span>
        <span class="time">${this.time}</span>`;
        li.innerHTML = dom;    
        chatList.appendChild(li);
    }
}