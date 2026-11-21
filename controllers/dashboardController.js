const { getPool } = require('../db');

exports.getStats = async (req, res) => {
  try {
    const pool = await getPool();
    const totalBooks = await pool.request().query('SELECT SUM(TotalCopies) as count FROM Book');
    const issuedBooks = await pool.request().query("SELECT COUNT(*) as count FROM IssueRecord WHERE Status = 'Issued'");
    const members = await pool.request().query('SELECT COUNT(*) as count FROM Member');
    const overdue = await pool.request().query("SELECT COUNT(*) as count FROM IssueRecord WHERE ReturnDate IS NULL AND DueDate < GETDATE()");

    res.json({
      totalBooks: totalBooks.recordset[0].count || 0,
      issuedBooks: issuedBooks.recordset[0].count || 0,
      members: members.recordset[0].count || 0,
      overdue: overdue.recordset[0].count || 0
    });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getRecentActivity = async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request().query(`
      SELECT TOP 5 ir.IssueID, m.Name AS MemberName, b.Title AS BookTitle, ir.IssueDate, ir.Status
      FROM IssueRecord ir
      JOIN Member m ON ir.MemberID = m.MemberID
      JOIN Book b ON ir.BookID = b.BookID
      ORDER BY ir.IssueID DESC`);
    res.json(result.recordset);
  } catch (err) { res.status(500).json({ error: err.message }); }
};