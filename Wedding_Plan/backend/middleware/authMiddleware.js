const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Get the token from the Authorization header or query string
  const token = req.header('Authorization')?.replace('Bearer ', '') || req.query.token;

  // If no token is provided, deny access
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify the token using the JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user info to the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle different JWT errors explicitly
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired, please login again' });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token, authorization denied' });
    }
    console.error(`JWT Error: ${error.message}`);  // Log error for internal tracking
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = authMiddleware;
