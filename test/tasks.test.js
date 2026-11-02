const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const { once } = require('node:events');

const app = require('../src/app');
const dataFile = path.join(__dirname, '../data/tasks.json');
let server;
let baseUrl;
let taskId;

test.before(async () => {
  await fs.writeFile(dataFile, '[]\n', 'utf8');
  server = app.listen(0);
  await once(server, 'listening');
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

test.after(() => server.close());

async function request(pathname, options) {
  const response = await fetch(`${baseUrl}${pathname}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  });
  return { status: response.status, body: await response.json() };
}

test('creates a task with defaults', async () => {
  const result = await request('/tasks', { method: 'POST', body: JSON.stringify({ title: 'Test task' }) });
  assert.equal(result.status, 201);
  assert.equal(result.body.success, true);
  assert.equal(result.body.data.priority, 'medium');
  assert.equal(result.body.data.status, 'pending');
  taskId = result.body.data.id;
});

test('lists, reads and updates a task', async () => {
  const list = await request('/tasks');
  assert.equal(list.status, 200);
  assert.equal(list.body.data.length, 1);

  const detail = await request(`/tasks/${taskId}`);
  assert.equal(detail.status, 200);
  assert.equal(detail.body.data.id, taskId);

  const updated = await request(`/tasks/${taskId}`, { method: 'PUT', body: JSON.stringify({ status: 'completed' }) });
  assert.equal(updated.status, 200);
  assert.equal(updated.body.data.status, 'completed');
});

test('validates input and handles missing IDs', async () => {
  const missingTitle = await request('/tasks', { method: 'POST', body: JSON.stringify({ description: 'Invalid' }) });
  assert.equal(missingTitle.status, 400);
  const missingTask = await request('/tasks/missing-id');
  assert.equal(missingTask.status, 404);
});

test('deletes a task', async () => {
  const deleted = await request(`/tasks/${taskId}`, { method: 'DELETE' });
  assert.equal(deleted.status, 200);
  const missing = await request(`/tasks/${taskId}`);
  assert.equal(missing.status, 404);
});
