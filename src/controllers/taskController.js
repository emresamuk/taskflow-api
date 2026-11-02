const taskService = require('../services/taskService');
const { validateTaskInput } = require('../utils/taskValidation');

async function listTasks(req, res, next) {
  try {
    const tasks = await taskService.getAllTasks();
    res.json({ success: true, data: tasks });
  } catch (error) { next(error); }
}

async function getTask(req, res, next) {
  try {
    const task = await taskService.getTaskById(req.params.id);
    if (!task) return res.status(404).json({ success: false, error: 'Task not found.' });
    return res.json({ success: true, data: task });
  } catch (error) { return next(error); }
}

async function createTask(req, res, next) {
  try {
    const validationError = validateTaskInput(req.body);
    if (validationError) return res.status(400).json({ success: false, error: validationError });
    const task = await taskService.createTask(req.body);
    return res.status(201).json({ success: true, data: task });
  } catch (error) { return next(error); }
}

async function updateTask(req, res, next) {
  try {
    const validationError = validateTaskInput(req.body, { partial: true });
    if (validationError) return res.status(400).json({ success: false, error: validationError });
    const task = await taskService.updateTask(req.params.id, req.body);
    if (!task) return res.status(404).json({ success: false, error: 'Task not found.' });
    return res.json({ success: true, data: task });
  } catch (error) { return next(error); }
}

async function removeTask(req, res, next) {
  try {
    const task = await taskService.deleteTask(req.params.id);
    if (!task) return res.status(404).json({ success: false, error: 'Task not found.' });
    return res.json({ success: true, message: 'Task deleted successfully.', data: task });
  } catch (error) { return next(error); }
}

module.exports = { listTasks, getTask, createTask, updateTask, removeTask };
