const { sql, getPool } = require('../db');

exports.issueBook = async (req, res) => {
  try {
    const { memberID, bookID, dueDate } = req.body;
    const pool = await getPool();
    await pool.request()
      .input('MemberID', sql.Int, memberID).input('BookID', sql.Int, bookID).input('DueDate', sql.Date, dueDate)
      .execute('sp_IssueBook');
    res.json({ message: 'Book issued successfully' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.returnBook = async (req, res) => {
  try {
    const { issueID } = req.body;
    const pool = await getPool();
    await pool.request().input('IssueID', sql.Int, issueID).execute('sp_ReturnBook');
    res.json({ message: 'Book returned successfully' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getActiveIssues = async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request().query(`
      SELECT ir.IssueID, m.Name AS MemberName, m.MemberID, b.Title AS BookTitle, b.BookID, ir.IssueDate, ir.DueDate
      FROM IssueRecord ir
      JOIN Member m ON ir.MemberID = m.MemberID
      JOIN Book b ON ir.BookID = b.BookID
      WHERE ir.Status = 'Issued'
      ORDER BY ir.IssueID DESC`);
    res.json(result.recordset);
  } catch (err) { res.status(500).json({ error: err.message }); }
};