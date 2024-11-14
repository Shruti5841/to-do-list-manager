let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let filter = 'all';

// Function to add a new task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskName = taskInput.value.trim();
    if (taskName) {
        const newTask = {
            id: Date.now(),
            name: taskName,
            completed: false
        };
        tasks.push(newTask);
        saveAndRenderTasks();
    }
    taskInput.value = '';
}

// Function to save tasks to localStorage
function saveAndRenderTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// Function to render tasks based on filter and search criteria
function renderTasks() {
    const taskList = document.getElementById('taskList');
    const noTasksMessage = document.getElementById('noTasksMessage');
    const filteredTasks = tasks.filter(task => {
        return filter === 'all' || 
               (filter === 'completed' && task.completed) || 
               (filter === 'active' && !task.completed);
    });

    taskList.innerHTML = '';
    filteredTasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';
        taskItem.draggable = true;
        
        if (task.completed) taskItem.classList.add('completed');

        taskItem.innerHTML = `
            <span ondblclick="editTask(${task.id})">${task.name}</span>
            <button onclick="toggleCompletion(${task.id})">Toggle Complete</button>
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;

        taskList.appendChild(taskItem);
    });

    noTasksMessage.style.display = filteredTasks.length ? 'none' : 'block';
}

// Function to delete a task
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveAndRenderTasks();
}

// Function to toggle task completion
function toggleCompletion(id) {
    const task = tasks.find(task => task.id === id);
    task.completed = !task.completed;
    saveAndRenderTasks();
}

// Function to edit a task
function editTask(id) {
    const task = tasks.find(task => task.id === id);
    const newTaskName = prompt("Edit Task:", task.name);
    if (newTaskName !== null && newTaskName.trim()) {
        task.name = newTaskName.trim();
        saveAndRenderTasks();
    }
}

// Function to filter tasks
function filterTasks(criteria) {
    filter = criteria;
    renderTasks();
}

// Function to search tasks in real-time
function searchTasks() {
    const searchTerm = document.getElementById('searchBar').value.toLowerCase();
    const filteredTasks = tasks.filter(task => task.name.toLowerCase().includes(searchTerm));
    
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    filteredTasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';
        taskItem.draggable = true;

        if (task.completed) taskItem.classList.add('completed');

        taskItem.innerHTML = `
            <span ondblclick="editTask(${task.id})">${task.name}</span>
            <button onclick="toggleCompletion(${task.id})">Toggle Complete</button>
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;

        taskList.appendChild(taskItem);
    });
}

// Load tasks when page loads
document.addEventListener('DOMContentLoaded', () => {
    renderTasks();
});

  