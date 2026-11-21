const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sql, poolPromise } = require('../db');
require('dotenv').config();

exports.register = async (req, res) => {
  try {
    const { username, password, fullName } = req.body;
    if (!username || !password || !fullName) return res.status(400).json({ message: 'All fields required' });
    const pool = await poolPromise;
    const existing = await pool.request().input('u', sql.NVarChar, username).query('SELECT LibrarianID FROM Librarian WHERE Username=@u');
    if (existing.recordset.length) return res.status(409).json({ message: 'Username already exists' });
    
    const hash = await bcrypt.hash(password, 10);
    await pool.request()
      .input('u', sql.NVarChar, username)
      .input('p', sql.NVarChar, hash)
      .input('n', sql.NVarChar, fullName)
      .query('INSERT INTO Librarian (Username, PasswordHash, FullName) VALUES (@u,@p,@n)');
    res.json({ message: 'Registration successful! Welcome to the University Library.' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const pool = await poolPromise;
    const result = await pool.request().input('u', sql.NVarChar, username).query('SELECT * FROM Librarian WHERE Username=@u');
    if (!result.recordset.length) return res.status(401).json({ message: 'Invalid credentials' });
    
    const lib = result.recordset[0];
    let ok = false;
    if (lib.PasswordHash.startsWith('$2')) {
      ok = await bcrypt.compare(password, lib.PasswordHash);
    } else {
      ok = (password === lib.PasswordHash); // Seed data plain text
    }
    
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
    
    const token = jwt.sign({ id: lib.LibrarianID, username: lib.Username, name: lib.FullName }, process.env.JWT_SECRET, { expiresIn: '8h' });
    res.json({ token, name: lib.FullName, message: 'Login successful' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};