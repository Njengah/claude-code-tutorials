// =============================================
// Task Manager — Starter
//
// Two agents will extend this in parallel:
//   feature/dark-mode     → adds dark mode toggle
//   feature/local-storage → adds localStorage persistence
// =============================================

let tasks = [];

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const emptyState = document.getElementById("emptyState");

function renderTasks() {
  taskList.innerHTML = "";
  emptyState.style.display = tasks.length === 0 ? "block" : "none";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = `task-item${task.done ? " done" : ""}`;
    li.innerHTML = `
      <input type="checkbox" ${task.done ? "checked" : ""} data-index="${index}" />
      <span>${task.text}</span>
      <button class="delete" data-index="${index}" title="Delete">✕</button>
    `;
    taskList.appendChild(li);
  });
}

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;
  tasks.push({ text, done: false });
  taskInput.value = "";
  renderTasks();
}

taskList.addEventListener("change", (e) => {
  if (e.target.type === "checkbox") {
    tasks[parseInt(e.target.dataset.index)].done = e.target.checked;
    renderTasks();
  }
});

taskList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    tasks.splice(parseInt(e.target.dataset.index), 1);
    renderTasks();
  }
});

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keydown", (e) => { if (e.key === "Enter") addTask(); });

renderTasks();