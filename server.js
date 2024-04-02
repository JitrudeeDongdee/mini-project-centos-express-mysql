// server.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const NetflixShow = require('./models/NetflixShow');
// Import Middleware
const { checkIfShowExists, checkIfValidID, logRequest } = require('./middleware/middlewares');
const authenticateUser = require('./middleware/authenticateUser');
const validateRequestBody = require('./middleware/validateRequestBody');

// Use Middleware
app.use(bodyParser.json());
app.use(authenticateUser);
app.use(validateRequestBody);
app.use(checkIfShowExists);
app.use(checkIfValidID);
app.use(logRequest);

// Routes
const netflixShowRouter = require('./routes/netflixShowRoute');
// app.use(netflixShowRouter);
app.use('/', netflixShowRouter);

app.get('/home', (req, res) => {
  	res.send('สวัสดีจาก API บน CentOS!');
});
// Start server
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
