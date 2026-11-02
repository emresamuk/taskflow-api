function errorHandler(error, req, res, next) {
  console.error(error);
  if (res.headersSent) return next(error);
  if (error instanceof SyntaxError && error.status === 400 && error.type === 'entity.parse.failed') {
    return res.status(400).json({ success: false, error: 'Request body must contain valid JSON.' });
  }
  return res.status(500).json({ success: false, error: 'Internal server error.' });
}

module.exports = errorHandler;
