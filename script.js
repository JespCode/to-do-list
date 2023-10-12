// Global Variables - Input, button and the to-do list itself.
const inputElement = document.querySelector("#task-input");
const addTaskButton = document.querySelector("#add-task");
const clearTasksButton = document.querySelector("#clear-tasks");
const taskList = document.querySelector("#task-list");

// Setting up array for localStorage.
let tasksArray = localStorage.getItem("tasks")
  ? JSON.parse(localStorage.getItem("tasks"))
  : [];

// Running the addTask function below on each localStorage object to add them to the DOM.
tasksArray.forEach(function (task, index) {
  addTask(task, index);
});

// Function to add a task to the list in the DOM, with a checkbox and delete button as a <p> element in a <li> element.
// The index is used to allow the deleteButtons to target the correct entry.
function addTask(task, index) {
  // Retrieving inputElement text value and creating a <li> and <p> element.
  const listItem = document.createElement("li");
  const textElement = document.createElement("p");

  // Giving listItem the class task-list-item and setting the textContent of the <p> to task, the input value.
  listItem.className = "task-list-item";
  textElement.textContent = task;

  // Creates an input, gives it the type checkbox, adds an event listener with a function to mark the task as done, and appends it to listItem.
  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.addEventListener("change", function () {
    textElement.classList.toggle("finished-task");
  });
  listItem.appendChild(checkBox);

  // Appending textElement to listItem, then appending the finished part of the listItem to the taskList.
  listItem.appendChild(textElement);
  taskList.appendChild(listItem);

  // Creating delete button with textContent, an event listener with a function to delete the listItem, and appending it to the listItem.
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.className = "delete-button";
  // Eventlistener + function to allow the button to both remove the element from the DOM.
  // Uses the index of the entry and the .splice() method to accomplish this.
  deleteButton.addEventListener("click", function () {
    // Remove the item from the array and update localStorage
    tasksArray.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasksArray));

    // Remove the listItem from the DOM
    listItem.remove();
  });
  listItem.appendChild(deleteButton);

  // Reset the value of the input so the placeholder appears again.
  inputElement.value = "";
}

// Function to add a task to the localStorage, then call the function to add the full <li> element to the DOM.
function addStorage() {
  const newTask = inputElement.value;
  // Check if a task was entered, give an alert that instructs the user to do so if none is found, continue if a task is present.
  if (newTask.length === 0) {
    alert("Please enter a task!");
    return;
  } else {
    tasksArray.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
    // Creates the actual index of the entry by using .length's output -1, as starting at 0 is desirable for an index.
    addTask(newTask, tasksArray.length - 1); //
  }
}

// Function to completely clear localStorage and delete all tasks from the DOM. Prompts the user for confirmation first and does not execute if cancelled.
function clearStorage() {
  let confirmText =
    "This will delete all list entries.\nAre you sure you want to do this?";
  if (confirm(confirmText) === true) {
    localStorage.clear();
    taskList.innerHTML = "";
    tasksArray = [];
  } else {
    return;
  }
}

// Event listener for buttons.
addTaskButton.addEventListener("click", addStorage);
clearTasksButton.addEventListener("click", clearStorage);

// Event listener listening for the Enter button being clicked, targeting the entire document. Adds task to the list if it happens.
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addStorage();
  }
});
