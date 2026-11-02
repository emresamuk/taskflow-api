const fs = require('node:fs/promises');
const path = require('node:path');
const { randomUUID } = require('node:crypto');

const dataFile = path.join(__dirname, '../../data/tasks.json');

async function readTasks() {
  const content = await fs.readFile(dataFile, 'utf8');
  return JSON.parse(content);
}

async function writeTasks(tasks) {
  await fs.writeFile(dataFile, `${JSON.stringify(tasks, null, 2)}\n`, 'utf8');
}

async function getAllTasks() {
  return readTasks();
}

async function getTaskById(id) {
  const tasks = await readTasks();
  return tasks.find((task) => task.id === id) || null;
}

async function createTask(input) {
  const tasks = await readTasks();
  const now = new Date().toISOString();
  const task = {
    id: randomUUID(),
    title: input.title.trim(),
    description: typeof input.description === 'string' ? input.description.trim() : '',
    priority: input.priority || 'medium',
    assignee: typeof input.assignee === 'string' ? input.assignee.trim() : '',
    status: input.status || 'pending',
    createdAt: now,
    updatedAt: now
  };
  tasks.push(task);
  await writeTasks(tasks);
  return task;
}

async function updateTask(id, input) {
  const tasks = await readTasks();
  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) return null;

  const current = tasks[index];
  const updated = {
    ...current,
    ...input,
    ...(typeof input.title === 'string' ? { title: input.title.trim() } : {}),
    ...(typeof input.description === 'string' ? { description: input.description.trim() } : {}),
    ...(typeof input.assignee === 'string' ? { assignee: input.assignee.trim() } : {}),
    updatedAt: new Date().toISOString()
  };
  tasks[index] = updated;
  await writeTasks(tasks);
  return updated;
}

async function deleteTask(id) {
  const tasks = await readTasks();
  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) return null;
  const [deleted] = tasks.splice(index, 1);
  await writeTasks(tasks);
  return deleted;
}

module.exports = { getAllTasks, getTaskById, createTask, updateTask, deleteTask };
