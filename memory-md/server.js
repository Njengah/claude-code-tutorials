const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Simulated async data source
const getUsers = async () => {
  return [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
  ];
};

// GET /health
app.get('/health', async (req, res, next) => {
  try {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  } catch (err) {
    next(err);
  }
});

// GET /api/users
app.get('/api/users', async (req, res, next) => {
  try {
    const users = await getUsers();
    res.json({ users });
  } catch (err) {
    next(err);
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Centralized error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
