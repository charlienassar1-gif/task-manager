const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateCounter() {
  const remaining = tasks.filter(t => !t.done).length;
  taskCount.textContent = remaining;
}

function renderTasks() {
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = task.done ? 'done' : '';

    const span = document.createElement('span');
    span.textContent = task.text;
    span.addEventListener('click', () => toggleTask(index));

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '✕';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', () => deleteTask(index));

    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });

  updateCounter();
}

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;

  tasks.push({ text, done: false });
  saveTasks();
  renderTasks();
  taskInput.value = '';
  taskInput.focus();
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTask();
});

renderTasks();
