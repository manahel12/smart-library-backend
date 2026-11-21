const { sql, getPool } = require('../db');

exports.getAllResources = async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request().query('SELECT * FROM DigitalResource ORDER BY ResourceID DESC');
    res.json(result.recordset);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.addResource = async (req, res) => {
  try {
    const { title, resourceType, url, categoryID } = req.body;
    const pool = await getPool();
    await pool.request()
      .input('t', sql.NVarChar, title).input('rt', sql.NVarChar, resourceType)
      .input('u', sql.NVarChar, url).input('c', sql.Int, categoryID)
      .query('INSERT INTO DigitalResource (Title, ResourceType, URL, CategoryID) VALUES (@t, @rt, @u, @c)');
    res.json({ message: 'Resource added successfully' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};