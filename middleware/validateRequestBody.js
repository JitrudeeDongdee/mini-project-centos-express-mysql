// validateRequestBody.js

const validateRequestBody = (req, res, next) => {
    const { title, certificate, runtime, genre, rating, votes } = req.body;
    if (!title || !certificate || !runtime || !genre || !rating || !votes) {
        return res.status(400).json({ message: 'Missing required fields in request body' });
    }
    next();
};

module.exports = validateRequestBody;
