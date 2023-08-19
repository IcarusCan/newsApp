'use strict';

// Task class
class Task {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}

// Get current user info
const CUR_USER = 'CURRENT_USER';
let [user] = getFromStorage(CUR_USER);
let currentUser = [];

// Get current task info
const TODO = 'TO_DO_LISTS';
let todoTaskArr = getFromStorage(TODO);
let currentTasks = [];

// Select element
const btnAdd = document.querySelector('#btn-add');
const taskInput = document.querySelector('#input-task');
const todoLists = document.querySelector('#todo-list');

// Function to parse user from Object --> Class
const parseTask = function (taskData) {
  return new Task(taskData.task, taskData.owner, taskData.isDone);
};

// Function to get owner task array
const ownerArr = function (arrTask, user) {
  return arrTask.filter(task => task.owner === user.userName);
};

// Function to find the index of a task in owner array
const indexOfTask = function (searchArr, searchVal) {
  return searchArr.findIndex(t => t.task === searchVal);
};

// Function to render to-do-list
const renderToDoList = function (taskArr) {
  todoLists.innerHTML = '';
  // Add dataset as index for further usage
  taskArr.forEach((t, index) => {
    todoLists.insertAdjacentHTML(
      'beforeend',
      `
        <li class="${t.isDone ? 'checked' : ''}" data-index="${index}">${
        t.task
      }<span class="close">x</span></li>
      `
    );
  });
};

// Function to render user's task
const renderUserTask = function (todoArr, user) {
  // Filter the owner task
  let ownerTaskArr = todoArr.filter(task => task.owner === user.userName);
  if (ownerTaskArr.length > 0) {
    renderToDoList(ownerTaskArr);
  } else {
    todoLists.innerHTML = `There is no task for ${user.userName}!`;
  }
};

// Event handler for Add button
btnAdd.addEventListener('click', function () {
  // Get task from input form
  const toDo = {
    task: taskInput.value,
    owner: currentUser.userName,
    isDone: false,
  };

  // Validate task input
  if (!toDo.task) {
    alert('You must input your task!');
    return;
  } else if (!toDo.owner) {
    alert('You must Login first!');
    return;
  }

  // Save to localStorage
  let newTask = parseTask(toDo);
  currentTasks.push(newTask);
  saveToStorage(TODO, currentTasks);

  // Render the user to-do-list
  renderUserTask(currentTasks, currentUser);

  // Clear the input
  taskInput.value = '';
});

// Event delegation handler for to-do-list
todoLists.addEventListener('click', function (e) {
  // If click on <li> element
  if (e.target.matches('li')) {
    // Toggle the display
    e.target.classList.toggle('checked');

    // Index get from the dataset, added when render
    const taskIndex = e.target.dataset.index;

    // Get user's(onwer) task
    let ownerTaskArr = ownerArr(currentTasks, currentUser);

    // Find the index in the whole task array
    let indexOfChosenTasks = indexOfTask(
      currentTasks,
      ownerTaskArr[taskIndex].task
    );

    // Toggle the status of task
    currentTasks[indexOfChosenTasks].isDone =
      !currentTasks[indexOfChosenTasks].isDone;

    // Update to localStorage
    saveToStorage(TODO, currentTasks);
  }

  // If click on <span> element with 'close' class
  if (e.target.matches('.close')) {
    // Find the index of chosen task in dataset
    const taskIndex = e.target.parentElement.dataset.index;

    // Get user's(onwer) task
    let ownerTaskArr = ownerArr(currentTasks, currentUser);

    // Find the index in the whole task array
    let indexOfChosenTasks = indexOfTask(
      currentTasks,
      ownerTaskArr[taskIndex].task
    );

    // Remove the task from array of task
    currentTasks.splice(indexOfChosenTasks, 1);

    // Update to localStorage
    saveToStorage(TODO, currentTasks);

    // Render again
    renderUserTask(currentTasks, currentUser);
  }
});

// If there are a user, who logged in
// console.log(user);
if (!user) {
  todoLists.innerHTML = 'Please Login First!';
} else {
  currentUser = parseUser(user);

  // Check task array from localStorage
  if (todoTaskArr.length !== 0) {
    // Load the task and render according to user
    todoTaskArr.forEach(task => currentTasks.push(parseTask(task)));
    renderUserTask(currentTasks, currentUser);
  } else {
    todoLists.innerHTML = 'There is no task!';
  }
}
