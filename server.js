const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./db'); 

const app = express();
app.use(cors({
  origin: 'https://smart-libraryweb.netlify.app'
}));
app.use(express.json());

// Routes Connect
app.use('/api/auth', require('./routes/auth'));
app.use('/api/books', require('./routes/books'));
app.use('/api/members', require('./routes/members'));
app.use('/api/issues', require('./routes/issues'));
app.use('/api/resources', require('./routes/resources'));
app.use('/api/dashboard', require('./routes/dashboard'));

app.get('/', (req, res) => {
  res.send('Smart Library API is running 🚀');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});