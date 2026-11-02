require('dotenv').config();

const app = require('./app');

const port = Number(process.env.PORT) || 3000;

const server = app.listen(port, () => {
  console.log(`Taskflow API listening at http://localhost:${port}`);
  console.log('Press Ctrl+C to stop the server.');
});

function shutdown(signal) {
  console.log(`\n${signal} received. Shutting down Taskflow API...`);
  server.close(() => {
    console.log('Server stopped.');
    process.exit(0);
  });
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
