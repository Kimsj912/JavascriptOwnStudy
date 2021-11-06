// Constants
const GAME_START = "게임시작";
const GAME_RUNNING = "게임중";
const GAME_END = "게임종료";
const GAME_LOADING_KOR = "게임 로딩중..";
const GAME_LOADIND_ENG = "loading";
const  GAME_TIME = 5;

// Attribute
const wordInput = document.querySelector(".word-input");
const wordDisplay = document.querySelector(".word-display");
const scoreDisplay = document.querySelector(".score");
const timeDisplay = document.querySelector(".time");
const button = document.querySelector(".button");

// Variable
let words = [];
let score = 0;
let time = 9;
let isPlaying= false;
let timeInterval;
let checkInterval;

// Initialize
init();
function init(){
    buttonChange(GAME_LOADING_KOR);
    getWords();
    wordInput.addEventListener('input', chechMatch);
}

// playing game
function run(){
    if(isPlaying) return;
    isPlaying = true;
    time = GAME_TIME;
    wordInput.focus();
    scoreDisplay.innerText = 0;
    timeInterval = setInterval(countDown,1000);
    checkInterval = setInterval(checkStatus,50);
    buttonChange(GAME_RUNNING);
}

// check status
function checkStatus(){
    if(!isPlaying && time === 0){
        buttonChange(GAME_START);
        clearInterval(checkInterval);
    }
}

// get words
function getWords(){
    // Make a request for a user with a given ID
    axios.get('https://random-word-api.herokuapp.com/all')
    .then(function (response) {
        // handle success
        response.data.forEach((word)=>{if(word.length < 10)  words.push(word);})
        buttonChange(GAME_START);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
}

// check matching
function chechMatch () {
    if(wordInput.value.toLowerCase() === wordDisplay.innerHTML.trim().toLowerCase()){
        wordInput.value="";
        if(!isPlaying) return;

        score++;
        scoreDisplay.innerText = score;
        time = GAME_TIME;
        const randomIdx = Math.floor( Math.random() * words.length);
        wordDisplay.innerText = words[randomIdx];
    }
};

// time count down
function countDown(){
    time > 0 ? time-- : isPlaying = false;
    if(!isPlaying) clearInterval(timeInterval); 
    timeDisplay.innerText = time;
}

// change button's text
function buttonChange(text){
    button.innerText =  text;
    text === GAME_START 
    ? button.classList.remove(GAME_LOADIND_ENG)
    : button.classList.add(GAME_LOADIND_ENG);
}

// Events
button.addEventListener("click",run);
