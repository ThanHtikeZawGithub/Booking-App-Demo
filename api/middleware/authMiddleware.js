const jwt = require('jsonwebtoken');
const jwtSecret = 'sdffafdsfsdgdsgegfegeg';

// Middleware function to authenticate user
const authenticateUser = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, jwtSecret, {}, (err, userData) => {
      if (err) {
        // Handle invalid token or authentication failure
        return res.status(401).json({ error: 'Unauthorized' });
      }
      // Attach the user data to the request object
      req.user = userData;
      next();
    });
  } else {
    // Handle missing token or authentication failure
    res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = authenticateUser;

