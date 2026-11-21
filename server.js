const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { getPool } = require('./db'); // <-- Ye line add ki hai

const app = express();

// CORS Configuration - Netlify frontend ko allow karne ke liye
const corsOptions = {
  origin: ['https://smart-libraryweb.netlify.app', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// CORS middleware apply karein
app.use(cors(corsOptions));

// Preflight requests (OPTIONS) ko handle karein
app.options('*', cors(corsOptions));

// Body parser middleware
app.use(express.json());

// Routes Connect
app.use('/api/auth', require('./routes/auth'));
app.use('/api/books', require('./routes/books'));
app.use('/api/members', require('./routes/members'));
app.use('/api/issues', require('./routes/issues'));
app.use('/api/resources', require('./routes/resources'));
app.use('/api/dashboard', require('./routes/dashboard'));

// Test Route
app.get('/', (req, res) => {
  res.send('Smart Library API is running 🚀');
});

// Database Connection Test Route (Naya add kiya hai)
app.get('/test-db', async (req, res) => {
  try {
    const pool = await getPool();
    res.json({ message: 'Vercel connected to AWS Database successfully! 🎉' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Vercel ke liye server start karein
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});