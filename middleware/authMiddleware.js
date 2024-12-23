const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Get token from Authorization header
  const token = req.headers['authorization']?.split(' ')[1]; // "Bearer <token>"
  
  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user details to the request object
    next();
  } catch (error) {
    // Invalid token
    res.status(401).json({ message: 'Invalid token.' });
  }
};

module.exports = { authMiddleware };
