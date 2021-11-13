// 사용 npm
// npm install express socket.io moment 
// npm install -g nodemon

// Modules
const express = require("express"); // node express를 사용할 수 있게 함.
const http = require("http"); // socket io를 받을 수 있게 하기위함. +우린 웹소켓이니까 http를 사용
const path = require("path") // 노드제이에스의 기본적인 모듈, url만들기 편리해짐
const socketIO = require("socket.io"); 
const moment = require("moment");

// Constant
const PORT = process.env.PORT || 5000;

// Variable
const app = express(); // 익스프레스 실행내용을 담음.
const server = http.createServer(app); // 서버를 담음.
const io = socketIO(server); // 서버를 담은 socketio를 담음.

// server 실행 명령어
app.use(express.static(path.join(__dirname, "src"))); // src의 내용을 서버로 열겠다.
server.listen(PORT, ()=> console.log(`server is running... ${PORT}`));

// io(chat.js)로 부터 데이터를 받음.
io.on("connection",(socket)=>{
    socket.on("chatting", (data)=>{
        const {name, msg} = data;
        io.emit("chatting",
            {name,
            msg,
            time : moment(new Date()).format("h:mm A")
        });
    }); // 채팅아이디, 사용함수
})