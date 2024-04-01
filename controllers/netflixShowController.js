const mysql = require('mysql');

// Create connection to MySQL database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'your_database'
});

// Connect to MySQL database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database: ' + err.stack);
        return;
    }
    console.log('Connected to database as ID: ' + connection.threadId);
});

// Function to execute SQL query
const executeQuery = (sql, params, res, callback) => {
    connection.query(sql, params, (err, results) => {
        if (err) {
            console.error('Error executing query: ' + err.stack);
            res.status(500).json({ message: 'Error executing query' });
            return;
        }
        callback(results);
    });
};

// Controller function to get all Netflix shows
const getAllNetflixShows = (req, res) => {
    const sql = 'SELECT * FROM netflix_shows';
    executeQuery(sql, [], res, (results) => {
        res.json(results);
    });
};

// Controller function to get Netflix show by ID
const getNetflixShowById = (req, res) => {
    const sql = 'SELECT * FROM netflix_shows WHERE id = ?';
    executeQuery(sql, [req.params.id], res, (results) => {
        if (results.length === 0) {
            res.status(404).json({ message: 'Netflix show not found' });
            return;
        }
        res.json(results[0]);
    });
};

// Controller function to add Netflix show
const addNetflixShow = (req, res) => {
    const { title, genre, rating, votes } = req.body;
    const sql = 'INSERT INTO netflix_shows (title, genre, rating, votes) VALUES (?, ?, ?, ?)';
    const params = [title, genre, rating, votes];
    executeQuery(sql, params, res, (results) => {
        res.status(201).json({ message: 'Netflix show added successfully' });
    });
};

// Controller function to update Netflix show
const updateNetflixShow = (req, res) => {
    const { title, genre, rating, votes } = req.body;
    const sql = 'UPDATE netflix_shows SET title = ?, genre = ?, rating = ?, votes = ? WHERE id = ?';
    const params = [title, genre, rating, votes, req.params.id];
    executeQuery(sql, params, res, (results) => {
        if (results.affectedRows === 0) {
            res.status(404).json({ message: 'Netflix show not found' });
            return;
        }
        res.json({ message: 'Netflix show updated successfully' });
    });
};

// Controller function to delete Netflix show
const deleteNetflixShow = (req, res) => {
    const sql = 'DELETE FROM netflix_shows WHERE id = ?';
    executeQuery(sql, [req.params.id], res, (results) => {
        if (results.affectedRows === 0) {
            res.status(404).json({ message: 'Netflix show not found' });
            return;
        }
        res.json({ message: 'Netflix show deleted successfully' });
    });
};

module.exports = {
    getAllNetflixShows,
    getNetflixShowById,
    addNetflixShow,
    updateNetflixShow,
    deleteNetflixShow
};
