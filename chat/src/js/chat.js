"use strict" // js의 오류를 줄여나가는 방향의 일환?

// Attribute
const socket = io(); // socket io불러오기
const chatList = document.querySelector(".chatting-list");
const chatInput = document.querySelector(".chatting-input");
const sendButton = document.querySelector(".send-button");
const displayContainer = document.querySelector(".display-container");

// send msg data to server
function send(){
    const param = {
        name : document.querySelector("#nickname").innerText,
        msg : chatInput.value,
    }
    console.log(param.name);
    socket.emit("chatting", param); // 채널아이디, 내용 객체를 담아 소켓으로 보냄.
}

//  get  msgs from server
socket.on("chatting",(data)=>{
    console.log(data);
    const {name, msg, time} = data;
    const item = new LiModel(name, msg, time);
    item.makeLi();
    displayContainer.scrollTo(0,displayContainer.scrollHeight);
})

// Obj - li tag model about chatting block
function LiModel(name, msg, time){
    this.name= name;
    this.msg = msg;
    this.time = time;

    this.makeLi = ()=>{
        const nickname = document.querySelector("#nickname");
        const li = document.createElement("li");
        li.classList.add(nickname.innerText === this.name ? "sent": "receive");
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

// Event
sendButton.addEventListener("click",send);
chatInput.addEventListener("keypress",(e)=>{
    if(e.keyCode===13) send();
});