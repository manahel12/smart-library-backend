const { sql, getPool } = require('../db');

exports.getAllBooks = async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request().query(`
      SELECT b.*, c.CategoryName,
        STUFF((SELECT ', ' + a.AuthorName FROM BookAuthor ba JOIN Author a ON ba.AuthorID=a.AuthorID WHERE ba.BookID=b.BookID FOR XML PATH('')),1,2,'') AS Authors
      FROM Book b LEFT JOIN Category c ON b.CategoryID=c.CategoryID ORDER BY b.BookID DESC`);
    res.json(result.recordset);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.searchBooks = async (req, res) => {
  try {
    const { query } = req.query;
    const searchTerm = `%${query}%`;
    const pool = await getPool();
    const result = await pool.request().input('q', sql.NVarChar, searchTerm).query(`
      SELECT DISTINCT b.*, c.CategoryName,
        STUFF((SELECT ', ' + a.AuthorName FROM BookAuthor ba JOIN Author a ON ba.AuthorID=a.AuthorID WHERE ba.BookID=b.BookID FOR XML PATH('')),1,2,'') AS Authors
      FROM Book b 
      LEFT JOIN Category c ON b.CategoryID=c.CategoryID
      LEFT JOIN BookAuthor ba ON b.BookID = ba.BookID
      LEFT JOIN Author a ON ba.AuthorID = a.AuthorID
      WHERE b.Title LIKE @q OR b.ISBN LIKE @q OR c.CategoryName LIKE @q OR a.AuthorName LIKE @q
      ORDER BY b.BookID DESC`);
    res.json(result.recordset);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.addBook = async (req, res) => {
  try {
    const { title, isbn, categoryID, totalCopies } = req.body;
    const pool = await getPool();
    const r = await pool.request()
      .input('t', sql.NVarChar, title).input('i', sql.NVarChar, isbn)
      .input('c', sql.Int, categoryID).input('tc', sql.Int, totalCopies)
      .query(`INSERT INTO Book (Title,ISBN,CategoryID,TotalCopies,AvailableCopies) OUTPUT INSERTED.BookID VALUES (@t,@i,@c,@tc,@tc)`);
    res.json({ message: 'Book added successfully', bookID: r.recordset[0].BookID });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.deleteBook = async (req, res) => {
  try {
    const pool = await getPool();
    await pool.request().input('id', sql.Int, req.params.id).query('DELETE FROM BookAuthor WHERE BookID=@id');
    await pool.request().input('id', sql.Int, req.params.id).query('DELETE FROM Book WHERE BookID=@id');
    res.json({ message: 'Book deleted successfully' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};