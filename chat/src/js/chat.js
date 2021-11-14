"use strict" // js의 오류를 줄여나가는 방향의 일환?

// Attribute
const socket = io(); // socket io불러오기
// const nickname = document.querySelector("#nickname"); 
//  -> pug 쓰니까 처음 선언해둔건 변경후를 반영하지않아서 적용이 안됨. -> 쓸떄마다 불러서 사용함.
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
    socket.emit("chatting", param); // 채널아이디, 내용 객체를 담아 소켓으로 보냄.
}

//  get  msgs from server
socket.on("chatting",(data)=>{
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

    // make speech bubble
    this.makeLi = ()=>{
        // get nickname value
        const nickname = document.querySelector("#nickname");
        // make li tag
        const li = document.createElement("li");
        // Identifies whether sent or received
        li.classList.add(nickname.innerText === this.name ? "sent": "receive");
        // make dom value
        const dom = 
            `<span class='profile'>
            <span class="user">${this.name}</span>
            <img class="image" src="https://placeimg.com/50/50/any" alt="any">
            </span>
            <span class="message">${this.msg}</span>
            <span class="time">${this.time}</span>`;
        // set dom value
        li.innerHTML = dom;    
        // append li into chatlist
        chatList.appendChild(li);
    }
}

// Event
sendButton.addEventListener("click",send);
chatInput.addEventListener("keypress",(e)=>{ if(e.keyCode===13) send(); });