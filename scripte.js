const theme = document.getElementById("theme");
const newItemInput = document.getElementById("addItem");
const todoList = document.querySelector(".content ul");
const itemsLeft = document.querySelector(".items-left span");

theme.addEventListener("click", () => {
  document.querySelector("body").classList = [
    theme.checked ? "theme-light" : "theme-dark",
  ];
});
newItemInput.addEventListener("keypress", (e) => {
  if (e.charCode === 13 && newItemInput.value.length > 0) {
    createNewTodoItem(newItemInput.value);
    newItemInput.value = "";
  }
});
function createNewTodoItem(text) {
  const elem = document.createElement("li");
  elem.classList.add("flex-row");

  elem.innerHTML = `
    <label class="list-item">
    <input type="checkbox" class="checkbox" name="todoItem" checked />
    <span class="checkmark"></span>
    <span class="text">${text}</span>
    </label>
    <span class="remove"></span>
  
      `;
  todoList.append(elem);
  updateItemsCount(1);
}
function updateItemsCount(number) {
  itemsLeft.innerText = +itemsLeft.innerText + number;
}
//    remove items
function removeTodoItem(elem) {
  elem.remove();
  updateItemsCount(-1);
}
todoList.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove")) {
    removeTodoItem(event.target.parentElement);
  }
});
document.querySelector(".clear").addEventListener("click", () => {
  document.querySelectorAll(".list-item .checkbox:checked").forEach((item) => {
    removeTodoItem(item.closest("li"));
  });
});
document.querySelector(".clear-completed").addEventListener("click", () => {
  document.querySelectorAll(".list-item .checkbox:checked").forEach((item) => {
    removeTodoItem(item.closest("li"));
  });
});
document.querySelectorAll(".filter input").forEach((radio) => {
  radio.addEventListener("change", (e) => {
    filterTodoItems(e.target.id);
  });
});
function filterTodoItems(id) {
  const allItems = todoList.querySelectorAll("li");

  switch (id) {
    case "all":
      allItems.forEach((item) => {
        item.classList.remove("hidden");
      });
      break;
    case "active":
      allItems.forEach((item) => {
        item.querySelector("input").checked
          ? item.classList.add("hidden")
          : item.classList.remove("hidden");
      });
      break;
    default:
      allItems.forEach((item) => {
        !item.querySelector("input").checked
          ? item.classList.add("hidden")
          : item.classList.remove("hidden");
      });
      break;
  }
}
