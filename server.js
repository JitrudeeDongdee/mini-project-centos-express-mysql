// server.js
const express = require('express');
const app = express();
const NetflixShow = require('./models/NetflixShow');
// Import Middleware
const { checkIfShowExists, checkIfValidID, logRequest } = require('./middleware/middlewares');
const authenticateUser = require('./middleware/authenticateUser');
const validateRequestBody = require('./middleware/validateRequestBody');

// Use Middleware
app.use(authenticateUser);
app.use(validateRequestBody);
app.use(checkIfShowExists);
app.use(checkIfValidID);
app.use(logRequest);

// Routes
const netflixShowRouter = require('./routes/netflixShowRoute');
// app.use(netflixShowRouter);
app.use('/', netflixShowRoute);

// GET /netflix-shows
router.get('/netflix-shows', getAllNetflixShows);

// GET /netflix-shows/:id
router.get('/netflix-shows/:id', getNetflixShowById);

// POST /netflix-shows
router.post('/netflix-shows', authenticateUser, validateRequestBody, addNetflixShow);

// PUT /netflix-shows/:id
router.put('/netflix-shows/:id', authenticateUser, validateRequestBody, updateNetflixShow);

// DELETE /netflix-shows/:id
router.delete('/netflix-shows/:id', authenticateUser, deleteNetflixShow);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
