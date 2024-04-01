// Middleware: checkIfShowExists
const checkIfShowExists = (req, res, next) => {
    const showId = req.params.id; // หรือตามชื่อ parameter ที่ใช้ใน route
    // เช่น query database เพื่อตรวจสอบว่า showId นี้มีอยู่ในระบบหรือไม่
    const showExists = checkShowExistenceInDatabase(showId); // ฟังก์ชันตรวจสอบในฐานข้อมูล
    if (!showExists) {
        return res.status(404).json({ error: 'Show not found' });
    }
    next();
};

// Middleware: checkIfValidID
const checkIfValidID = (req, res, next) => {
    const showId = req.params.id; // หรือตามชื่อ parameter ที่ใช้ใน route
    // ตรวจสอบว่า showId เป็นรูปแบบที่ถูกต้องหรือไม่ เช่น มีความยาวเป็น 24 characters ฯลฯ
    if (!isValidIDFormat(showId)) {
        return res.status(400).json({ error: 'Invalid show ID format' });
    }
    next();
};

// Middleware: logRequest
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
    next();
};

// เพื่อแสดงตัวอย่าง ให้ใช้ฟังก์ชันดังนี้
function checkShowExistenceInDatabase(showId) {
    // จำลองการตรวจสอบว่า showId นี้มีอยู่ในฐานข้อมูลหรือไม่
    // ในตัวอย่างนี้จะใช้การสร้างตัวแปรสุ่มเพื่อจำลอง
    return Math.random() < 0.5; // จำลองว่ามีโชว์บางรายการอยู่ในฐานข้อมูล
}

function isValidIDFormat(showId) {
    // ตรวจสอบรูปแบบของ ID ว่าถูกต้องตามเงื่อนไขหรือไม่
    // ในตัวอย่างนี้จะตรวจสอบความยาวของ ID เท่ากับ 24 characters
    return showId.length === 24;
}

module.exports = { checkIfShowExists, checkIfValidID, logRequest };
