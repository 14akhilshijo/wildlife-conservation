// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

// Protect route for checking if the user is logged in
exports.protect = (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];  // Get the token from the header
      const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verify the token

      req.user = decoded;  // Attach user info to the request
      next();  // Proceed to the next middleware or route handler
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Admin route guard
exports.admin = (req, res, next) => {
  if (req.user && req.user.id === 'admin') {  // Only allow if the user ID is "admin"
    next();  // Proceed to the next middleware or route handler
  } else {
    res.status(403).json({ message: 'Access denied. Admins only.' });
  }
};
