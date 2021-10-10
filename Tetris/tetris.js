// DOM
const playground = document.querySelector(".playground > ul"); //  querySelector : 해당 태그 내용들을 모두 담아 가져옴.

// Setting
const GAME_ROWS = 20;
const GAME_COLS = 10;

// Vairables
let score = 0;
let duration = 500;
let downInterval;
let tempMovingItem; // 무빙 전에 잠깐 담아두는 변수

const BLOCKS = {
    tree : [ // tree라는 블록의 회전 별 모양을 담음.(direction으로 변화)
        [[2,1],[0,1],[1,0],[1,1]], //위를 보는 모양 , 안에는 좌표값을 배열로 담음.
        [[0,1],[1,0],[1,1],[2,1]], // 우측을 보는 모양
        [[2,1],[0,1],[1,0],[1,1]], // 아래를 보는 모양
        [[2,1],[0,1],[1,0],[1,1]], //  좌측을 보는 모양
    ]
}

const movingItem = { // 블럭의 타입과 정보를 담은 변수
    type : "tree", // 도형 타입
    direction : 0, // 도형 방향
    top : 0, // 현재 상하 위치
    left : 0, // 현재 좌우 위치
};


init();

// functions
function init(){ // 처음 시작될 때 호출되는 함수
    // spread Operator ({... 변수명}) : movingItem의 값만 가져오기 때문에 movingItem이 변경되어도 tempMovingItem은 영향X
    tempMovingItem = {...movingItem}; 

    for(let i = 0 ; i<GAME_ROWS ;i++){
        prependNewLine();
    }
    renderBlocks();
}

function prependNewLine(){
    const li = document.createElement("li"); // createElement : 해당 태그를 만듦
    const ul = document.createElement("ul");
    for(let j = 0 ; j<GAME_COLS ; j++){
        const matrix = document.createElement("li");
        ul.prepend(matrix); // 부모(ul)의 자식요소로 추가, but 맨 앞에 추가가 되어짐(<-> appendChild 맨 뒤에 추가됨.)
    }
    li.prepend(ul);
    playground.prepend(li);
}

function renderBlocks(){
    // Destructuring : tempMovingItem의 변수들을 미리 분리해서 해당 함수에서 (const떄문) 사용할 수 있게함.
    const {type, direction, top, left} = tempMovingItem; 
    const movingBlocks = document.querySelectorAll(".moving");
    movingBlocks.forEach(moving=>{
        moving.classList.remove(type,"moving");
    })
    
    BLOCKS[type][direction].forEach(block=>{
        const x = block[0] + left;
        const y = block[1] + top;

        // ul안의 li안의 ul안의 li (tetris내부 찾아가는거임.)
        // 있는 블록인지 체크 후 넣기
        const target = playground.childNodes[y]
            ? playground.childNodes[y].childNodes[0].childNodes[x] 
            : null; 
        if(checkEmpty(target)) {
            target.classList.add(type, "moving");
        } else{
            // 좌표를 다시 원상태로 옮기고 재귀함수 부름.
            tempMovingItem = { ...movingItem};
            setTimeout(()=>{ //주어진 일을 끝내고 부르도록 순서 변경(call stack에러 수정)
                renderBlocks(); 
                if(moveType === "top"){
                    seizeBlock();
                }
            },0)
        }
    })
    movingItem.left = left;
    movingItem.top = top;
    movingItem.direction = direction;
}

// 블럭이 더이상 내려가지 않도록 함.(더이상 내려갈 곳이 없으면 새로운 블록 만들도록 처리)
function seizeBlock(){


}

// target이 있는지 유무 체크
function checkEmpty(target){
    return target;
}

function moveBlock(moveType, amount){
    tempMovingItem[moveType] += amount;
    renderBlocks();
}

// Event Handling
document.addEventListener("keydown", e=>{
    // Switch는 ===을 사용함. (값과 데이터타입까지 동일해야함.)
    switch(e.key){ 
        case "ArrowRight" : 
            moveBlock("left",1);
            break;
        case "ArrowLeft" : 
            moveBlock("left",-1);
            break;
        case "ArrowUp" : 
            moveBlock("top",-1);
            break;
        case "ArrowDown" : 
            moveBlock("top",1);
            break;
        default:
            console.log("default");
            break;
    }
})