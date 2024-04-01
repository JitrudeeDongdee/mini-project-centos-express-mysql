// server.js
const express = require('express');
const app = express();

// Import Middleware
const { checkIfShowExists, checkIfValidID, logRequest } = require('./middleware/middlewares');
const authenticateUser = require('./middleware/authenticateUser');
const validateRequestBody = require('./middleware/validateRequestBody');

// Use Middleware
app.use(authenticateUser);
app.use(validateRequestBody);

// Routes
// Define your routes here

// Start server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
// server.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
// Define your routes here

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
