const todoList = document.querySelector(".content ul");

// Theme Switcher
const theme = document.getElementById("theme");
theme.addEventListener("click", function switchThemeMode() {
  const body = document.querySelector("body");
  if (theme.checked) {
    body.classList.add("theme-dark");
    body.classList.remove("theme-light");
  } else {
    body.classList.remove("theme-dark");
    body.classList.add("theme-light");
  }
});

// Add new item
const newItemInput = document.getElementById("addItem");
newItemInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && newItemInput.value.length > 0) {
    createNewTodoItem(newItemInput.value);
    newItemInput.value = "";
    updateItemsCount("add");
  }
});
function createNewTodoItem(text) {
  const todoItem = document.createElement("li");
  todoItem.classList.add("flex-row");
  todoItem.innerHTML = `
    <label class="list-item">
      <input type="checkbox" class="checkbox" name="todoItem" checked />
      <span class="checkmark"></span>
      <span class="text">${text}</span>
    </label>
    <span class="remove"></span>
  `;

  todoList.append(todoItem);
}

// Update the todo counter
function updateItemsCount(action) {
  const todoCounts = document.querySelectorAll(".todoCount");
  let number = 0;
  if (action === "add") {
    ++number;
  } else if (action === "remove") {
    --number;
  }

  todoCounts.forEach((todoCount) => {
    todoCount.innerText = Number(todoCount.innerText) + number;
  });
}

// Remove todo items
function removeTodoItem(todo) {
  todo.remove();
  updateItemsCount("remove");
}
todoList.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove")) {
    removeTodoItem(event.target.parentElement);
  }
});

// Clear all todo items
document.querySelectorAll(".clear").forEach((clearBtn) => {
  clearBtn.addEventListener("click", () => {
    document
      .querySelectorAll(".list-item .checkbox:checked")
      .forEach((item) => {
        removeTodoItem(item.closest("li"));
      });
  });
});

// Filter todo items
document.querySelectorAll(".filter input").forEach((radio) => {
  radio.addEventListener("change", (e) => {
    filterTodoItems(e.target.id);
  });
});
function filterTodoItems(status) {
  const allItems = todoList.querySelectorAll("li");

  switch (status) {
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
