// เรียกใช้ Express.js
const express = require('express');

// สร้างแอปพลิเคชัน Express
const app = express();

// กำหนดพอร์ตที่แอปพลิเคชันจะรับคำขอ
const port = 8000;

// เส้นทางหลัก
app.get('/', (req, res) => {
  res.send('สวัสดีจากแอปพลิเคชัน Express!');
});

const mainroutes = require('./routes/netflixShowRoute');
app.use('/api',mainroutes);

// เริ่มต้นแอปพลิเคชันโดยที่มันจะฟังคำขอที่พอร์ตที่กำหนด
app.listen(port, () => {
  console.log(`แอปพลิเคชันกำลังทำงานที่ http://localhost:${port}`);
});
