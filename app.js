const todoInput = document.getElementById("todo-input");
const addBtn = document.querySelector("#todo-button");
const todoUl = document.querySelector("#todo-ul");
let todoList = JSON.parse(localStorage.getItem("todoList")) || [];

window.addEventListener("load", () => {
  getTodoListFromLocalStorage();
});

const getTodoListFromLocalStorage = () => {
  todoList.forEach((todo) => {
    createTodo(todo);
  });
};

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (todoInput.value.trim() === "") {
    alert("Bir text giriniz");
    return;
  }
  const newTodo = {
    id: new Date().getTime(),
    completed: false,
    text: todoInput.value,
  };

  createTodo(newTodo);

  todoList.push(newTodo); //? Local strorage update
  localStorage.setItem("todoList", JSON.stringify(todoList)); //! localStorage vs session storage

  //? event.target vs event.currentTarget
  e.target.closest("form").reset();
});

const createTodo = (newTodo) => {
  const { id, completed, text } = newTodo;

  const li = document.createElement("li");
  li.setAttribute("id", id);

  completed ? li.classList.add("checked") : "";

  const icon = document.createElement("i");
  icon.setAttribute("class", "fas fa-check");
  li.append(icon);

  const p = document.createElement("p");
  p.innerText = text;
  li.appendChild(p);

  const removeIcon = document.createElement("i");
  removeIcon.setAttribute("class", "fas fa-trash");
  li.appendChild(removeIcon);

  todoUl.appendChild(li);
};

//* Capturing vs. Bubbling

todoUl.addEventListener("click", (e) => {
  const idAttr = e.target.closest("li").getAttribute("id");
  if (e.target.classList.contains("fa-check")) {
    e.target.parentElement.classList.toggle("checked");
    todoList.map((todo) => {
      if (todo.id == idAttr) {
        todo.completed = !todo.completed;
      }
    });
    localStorage.setItem("todoList", JSON.stringify(todoList));
  } else if (e.target.classList.contains("fa-trash")) {
    e.target.parentElement.remove();
    todoList = todoList.filter((todo) => todo.id != idAttr);
    localStorage.setItem("todoList", JSON.stringify(todoList));
  } else {
    alert("other element click");
  }
});
