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

router.post('/netflix-shows',addNetflixShow);

router.put('/netflix-shows/:id',updateNetflixShow);

router.delete('/netflix-shows/:id',deleteNetflixShow);

module.exports = router;
