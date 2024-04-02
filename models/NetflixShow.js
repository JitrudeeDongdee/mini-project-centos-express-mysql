const mysql = require('mysql');

// Create connection to MySQL database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '266543',
    database: 'netflix_db'
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

// Model for Netflix show
class NetflixShow {
    constructor(title, genre, rating, votes) {
        this.title = title;
        this.genre = genre;
        this.rating = rating;
        this.votes = votes;
    }

    // Function to save Netflix show to database
    save(callback) {
        const sql = 'INSERT INTO netflix_shows (title, genre, rating, votes) VALUES (?, ?, ?, ?)';
        const params = [this.title, this.genre, this.rating, this.votes];
        executeQuery(sql, params, null, callback);
    }

    // Static function to find all Netflix shows
    static findAll(callback) {
        const sql = 'SELECT * FROM netflix_shows';
        executeQuery(sql, [], null, callback);
    }

    // Static function to find Netflix show by ID
    static findById(id, callback) {
        const sql = 'SELECT * FROM netflix_shows WHERE id = ?';
        executeQuery(sql, [id], null, callback);
    }

    // Function to update Netflix show by ID
    update(id, callback) {
        const sql = 'UPDATE netflix_shows SET title = ?, genre = ?, rating = ?, votes = ? WHERE id = ?';
        const params = [this.title, this.genre, this.rating, this.votes, id];
        executeQuery(sql, params, null, callback);
    }

    // Function to delete Netflix show by ID
    static deleteById(id, callback) {
        const sql = 'DELETE FROM netflix_shows WHERE id = ?';
        executeQuery(sql, [id], null, callback);
    }
}

module.exports = NetflixShow;
