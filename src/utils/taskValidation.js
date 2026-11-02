const allowedPriorities = ['low', 'medium', 'high'];
const allowedStatuses = ['pending', 'in-progress', 'completed'];

function validateTaskInput(input, { partial = false } = {}) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return 'Request body must be a JSON object.';
  }

  if (!partial && (!Object.prototype.hasOwnProperty.call(input, 'title') || typeof input.title !== 'string' || !input.title.trim())) {
    return 'title is required and must be a non-empty string.';
  }

  if (partial && Object.prototype.hasOwnProperty.call(input, 'title') && (typeof input.title !== 'string' || !input.title.trim())) {
    return 'title must be a non-empty string.';
  }

  if (Object.prototype.hasOwnProperty.call(input, 'description') && typeof input.description !== 'string') {
    return 'description must be a string.';
  }

  if (Object.prototype.hasOwnProperty.call(input, 'assignee') && typeof input.assignee !== 'string') {
    return 'assignee must be a string.';
  }

  if (Object.prototype.hasOwnProperty.call(input, 'priority') && !allowedPriorities.includes(input.priority)) {
    return `priority must be one of: ${allowedPriorities.join(', ')}.`;
  }

  if (Object.prototype.hasOwnProperty.call(input, 'status') && !allowedStatuses.includes(input.status)) {
    return `status must be one of: ${allowedStatuses.join(', ')}.`;
  }

  return null;
}

module.exports = { validateTaskInput, allowedPriorities, allowedStatuses };
