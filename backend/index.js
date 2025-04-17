// Load required modules
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all origins (Frontend can access this backend)
app.use(express.json()); // Parse incoming JSON requests

// Root route - Optional
app.get('/', (req, res) => {
  res.send('Backend is running...');
});

// Example API route - Test it from frontend (e.g., /api/test)
app.get('/api/test', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
