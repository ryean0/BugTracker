const jwt = require('jsonwebtoken');
const config = require('config');

// Middleware function has access to request and response objects (req, res) and 'next' is a callback function that is run after the middleware completes, so we can move on to the next piece of middleware

module.exports = function(req, res, next) {
    // Get token from request header
    const token = req.header('x-auth-token');

    // Check if no token is there
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied!'});
    }

    // Verify token using the token itself and the secret we used to sign the token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid!'});
    }
}