// authenticateUser.js

const authenticateUser = (req, res, next) => {
    // const token = req.headers.authorization;
    // if (!token || token !== 'Bearer myToken') {
    //     return res.status(401).json({ message: 'Unauthorized' });
    // }
    next();
};

module.exports = authenticateUser;
