const jwt = require('jsonwebtoken');
import { Request, Response  } from "express"

// Define your secret key for signing and verifying tokens


function verifyToken(req:Request, res:Response, next:any) {
  // Get the token from the request headers or query parameters
  const token = req.headers.authorization ;
 

  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  // Verify the token
  jwt.verify(token, 'kimou', (err:any, decoded:any) => {
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