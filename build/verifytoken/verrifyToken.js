"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require('jsonwebtoken');
// Define your secret key for signing and verifying tokens
function verifyToken(req, res, next) {
    // Get the token from the request headers or query parameters
    var token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Token not provided' });
    }
    // Verify the token
    jwt.verify(token, 'kimou', function (err, decoded) {
        if (err) {
            return res.status(401).json({ message: 'Token verification failed' });
        }
        // If verification succeeds, you can store the decoded token data in the request object for later use
        req.user = decoded;
        // Continue processing the request
        next();
    });
}
module.exports = verifyToken;
//# sourceMappingURL=verrifyToken.js.map