const express = require('express');

const taskRoutes = require('./routes/taskRoutes');
const logger = require('./middleware/logger');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(express.json());
app.use(logger);

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to Taskflow API.',
    endpoints: {
      health: 'GET /health',
      tasks: 'GET, POST /tasks',
      taskById: 'GET, PUT, DELETE /tasks/:id'
    }
  });
});

app.get('/health', (req, res) => {
  res.json({ success: true, message: 'Taskflow API is running.' });
});

app.use('/tasks', taskRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
