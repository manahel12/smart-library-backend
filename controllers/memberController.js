const { sql, getPool } = require('../db');

exports.getAllMembers = async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request().query('SELECT * FROM Member ORDER BY MemberID DESC');
    res.json(result.recordset);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.addMember = async (req, res) => {
  try {
    const { name, email, department } = req.body;
    const pool = await getPool();
    await pool.request()
      .input('n', sql.NVarChar, name).input('e', sql.NVarChar, email).input('d', sql.NVarChar, department)
      .query('INSERT INTO Member (Name, Email, Department) VALUES (@n, @e, @d)');
    res.json({ message: 'Member added successfully' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};