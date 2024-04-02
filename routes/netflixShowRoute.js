// Import required modules
const express = require('express');
const router = express.Router();

// Import controller functions
const {
  getAllNetflixShows,
  getNetflixShowById,
  addNetflixShow,
  updateNetflixShow,
  deleteNetflixShow
} = require('../controllers/netflixShowController');

// Import middleware functions
const authenticateUser = require('../middleware/authenticateUser');
const validateRequestBody = require('../middleware/validateRequestBody');

// Routes
router.get('/netflix-shows', getAllNetflixShows);

router.get('/netflix-shows/:id', getNetflixShowById);

router.post('/netflix-shows', authenticateUser, validateRequestBody, addNetflixShow);

router.put('/netflix-shows/:id', authenticateUser, validateRequestBody, updateNetflixShow);

router.delete('/netflix-shows/:id', authenticateUser, deleteNetflixShow);

module.exports = router;
