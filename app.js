// Define UI Vars 


//Testing Git 

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners 
loadEventListeners();

//Load all event listeners 
function loadEventListeners(){

  //DOM Load event
  document.addEventListener('DOMContentLoaded', getTasks);
   
  //Add task event
   form.addEventListener('submit', addTask);   

   // Remove tsk events 
   taskList.addEventListener('click', removeTask);

   //Clear task event
   clearBtn.addEventListener('click', clearTasks);

   // Filter tasks events
   filter.addEventListener('keyup', filterTasks);
}

// Get tasks from LS
function getTasks(){
  let tasks;

  if (localStorage.getItem('tasks') === null){
    tasks = []; 
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
      // Create li element
  const li = document.createElement('li');
  
  // Add class
  li.className = 'collection-item';
  // Create text node and append to li 
  li.appendChild(document.createTextNode(task));
  

  // Create new link element
  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';

  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';

  // Add the link to li
  li.appendChild(link);
  
  // Add li to ul
  taskList.appendChild(li);
  })
}

// Add task 
function addTask(e) {
  if(taskInput.value === ''){
    console.log('Add a task');
  }

  // Create li element
  const li = document.createElement('li');
  
  // Add class
  li.className = 'collection-item';
  // Create text node and append to li 
  li.appendChild(document.createTextNode(taskInput.value));
  

  // Create new link element
  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';

  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  
  
  // Add the link to li
  li.appendChild(link);
  
  // Add a background color to the link
  li.style.backgroundColor = "#d2ffff";
  // Add li to ul
  taskList.appendChild(li);
  

  //Store to LS
  storeTaskInLocalStorage(taskInput.value);

  taskInput.value = '';
  
  e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task){
  let tasks;
  if (localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    console.log(JSON.parse(localStorage.getItem('tasks')));
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task 
function removeTask(e){
  if (e.target.parentElement.classList.contains('delete-item')){ 
    if(confirm('Are you sure?')){
    e.target.parentElement.parentElement.remove();
    // Remove from LS
    removeTaskFromLocalStorage(e.target.parentElement.parentElement)
    }
}
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if (localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}
// Clear tasks 
function clearTasks(){
  
  taskList.innerHTML = '';


  // Clear from LS
  clearTasksfromLocalStorage();
}

function clearTasksfromLocalStorage(){
  localStorage.clear();
}

// Filter tasks 
function filterTasks(e){
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}













