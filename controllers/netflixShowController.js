const mysql = require("mysql");

// Create connection to MySQL database
const connection = mysql.createConnection({
	host: "mini-project.c7qowy0066do.ap-southeast-2.rds.amazonaws.com",
	user: "root",
	password: "12345678",
	database: "netflix_db",
});

// Connect to MySQL database
connection.connect((err) => {
	if (err) {
		console.error("Error connecting to database: " + err.stack);
		return;
	}
	console.log("Connected to database as ID: " + connection.threadId);
});

// Function to execute SQL query
const executeQuery = (sql, params, res, callback) => {
	connection.query(sql, params, (err, results) => {
		if (err) {
			console.error("Error executing query: " + err.stack);
			res.status(500).json({ message: "Error executing query" });
			return;
		}
		callback(results);
	});
};

// Controller function to get all Netflix shows
const getAllNetflixShows = (req, res) => {
	const sql = "SELECT * FROM NetflixShow";
	executeQuery(sql, [], res, (results) => {
		res.json(results);
	});
};

// Controller function to get Netflix show by ID
const getNetflixShowById = (req, res) => {
	const sql = "SELECT * FROM NetflixShow WHERE id = ?";
	executeQuery(sql, [req.params.id], res, (results) => {
		if (results.length === 0) {
			res.status(404).json({ message: "Netflix show not found" });
			return;
		}
		res.json(results[0]);
	});
};

// Controller function to add Netflix show
const addNetflixShow = (req, res) => {
	const data = req.body;
	
	const sql = `INSERT INTO NetflixShow SET ?`;

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			console.error("Error executing query:", error,data);
			res.status(500).json({ error: "Failed to add Netflix show" ,data : data});
			return;
		}
		res
			.status(201)
			.json({ message: "Netflix show added successfully", data: results });
	});
};

//****
// Controller function to add Netflix show
const addNetflixShow = (req, res) => {
    const data = req.body;
    
    const sql = `INSERT INTO NetflixShow SET ?`;

    connection.query(sql, data, (error, results, fields) => {
        if (error) {
            console.error("Error executing query:", error);
            res.status(500).json({ error: "Failed to add Netflix show", data: data });
            return;
        }
        res.status(201).json({ message: "Netflix show added successfully", data: results });
    });
};

// Controller function to update Netflix show
const updateNetflixShow = (req, res) => {
    const { id } = req.params; // รับค่า id ของ Netflix show ที่ต้องการอัปเดต
    const newData = req.body; // รับข้อมูลที่ต้องการอัปเดต

    // สร้างคำสั่ง SQL สำหรับอัปเดตข้อมูล Netflix show โดยใช้ WHERE clause เพื่อระบุ Netflix show ที่ต้องการอัปเดต
    const sql = `UPDATE NetflixShow SET ? WHERE id = ?`;

    // ส่งคำสั่ง SQL ไปยังฐานข้อมูล MySQL พร้อมกับข้อมูลที่ต้องการอัปเดตและ id ของ Netflix show
    connection.query(sql, [newData, id], (error, results, fields) => {
        if (error) {
            console.error("Error executing query:", error);
            res.status(500).json({ error: "Failed to update Netflix show" });
            return;
        }
        // ตรวจสอบว่ามี Netflix show ที่ถูกอัปเดตหรือไม่
        if (results.affectedRows === 0) {
            // หากไม่พบ Netflix show ที่ต้องการอัปเดต ส่งคำตอบกลับว่าไม่พบ Netflix show
            res.status(404).json({ error: "Netflix show not found" });
            return;
        }
        // หากอัปเดต Netflix show สำเร็จ ส่งคำตอบกลับไปว่าอัปเดตข้อมูล Netflix show สำเร็จ
        res.status(200).json({ message: "Netflix show updated successfully" });
    });
};

// Controller function to update Netflix show
const updateNetflixShow = (req, res) => {
	const { id } = req.params; // รับค่า id ของ Netflix show ที่ต้องการอัปเดต
	const newData = req.body; // รับข้อมูลที่ต้องการอัปเดต

	// สร้างคำสั่ง SQL สำหรับอัปเดตข้อมูล Netflix show โดยใช้ WHERE clause เพื่อระบุ Netflix show ที่ต้องการอัปเดต
	const sql = `UPDATE NetflixShow SET ? WHERE id = ?`;

	// ส่งคำสั่ง SQL ไปยังฐานข้อมูล MySQL พร้อมกับข้อมูลที่ต้องการอัปเดตและ id ของ Netflix show
	connection.query(sql, [newData, id], (error, results, fields) => {
		if (error) {
			console.error("Error executing query:", error);
			res.status(500).json({ error: "Failed to update Netflix show" });
			return;
		}
		// ตรวจสอบว่ามี Netflix show ที่ถูกอัปเดตหรือไม่
		if (results.affectedRows === 0) {
			// หากไม่พบ Netflix show ที่ต้องการอัปเดต ส่งคำตอบกลับว่าไม่พบ Netflix show
			res.status(404).json({ error: "Netflix show not found" });
			return;
		}
		// หากอัปเดต Netflix show สำเร็จ ส่งคำตอบกลับไปว่าอัปเดตข้อมูล Netflix show สำเร็จ
		res.status(200).json({ message: "Netflix show updated successfully" });
	});
};

// Controller function to delete Netflix show
const deleteNetflixShow = (req, res) => {
	const sql = "DELETE FROM NetflixShow WHERE id = ?";
	executeQuery(sql, [req.params.id], res, (results) => {
		if (results.affectedRows === 0) {
			res.status(404).json({ message: "Netflix show not found" });
			return;
		}
		res.json({ message: "Netflix show deleted successfully" });
	});
};

module.exports = {
	getAllNetflixShows,
	getNetflixShowById,
	addNetflixShow,
	updateNetflixShow,
	deleteNetflixShow,
};
