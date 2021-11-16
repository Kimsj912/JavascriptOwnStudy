// Constant
const TODOS_KEY = "todos";

// DOM Element
const toDoForm = document.querySelector("#todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.querySelector("#todo-list");

// Variable
let toDos = []; // todos를 담는 배열

// paint todos  view 
function paintToDo(newTodoOj){
    const li = document.createElement("li");
    const span = document.createElement("span");
    const button = document.createElement("button");

    li.id = newTodoOj.id;
    span.innerText = newTodoOj.text;
    button.innerText = "❌";
    button.addEventListener("click",deleteToDo);

    li.appendChild(span);
    li.appendChild(button);
    toDoList.appendChild(li);
}

// submit todos 
function handleToDoSubmit(e){
    e.preventDefault();
    const newTodo = toDoInput.value;
    toDoInput.value = "";

    const newTodoObj = {
      text: newTodo,
      id: Date.now(),
    };
    
    toDos.push(newTodoObj);
    paintToDo(newTodoObj);
    saveToDos();
}

// delete todos
function deleteToDo(e){
    const li = e.target.parentElement;
    li.remove();
    // toDos에있는걸 하나 가져와서 id가 지울 대상과 다른것들만 다시 담는 거임.
    toDos = toDos.filter((todo)=> todo.id !== parseInt(li.id));
    saveToDos();
}

// save todos at localstorage
function saveToDos(){
    localStorage.setItem(TODOS_KEY,JSON.stringify(toDos));
}

// load todos
const savedToDos = localStorage.getItem(TODOS_KEY);
if (savedToDos !== null){
    let parsedToDos =  JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo);
}

// Event
toDoForm.addEventListener("submit",handleToDoSubmit);
