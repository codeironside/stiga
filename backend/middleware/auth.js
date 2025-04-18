const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  if (typeof req.headers.authorization !== 'string') {
    return res.status(400).json({ message: 'Invalid authorization header' });
  }
  let token = req.headers.authorization.split(' ')[1];
  console.log(token);

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      
      if (err.name === 'TokenExpiredError') {
        
        return res.status(401).json({ message: 'Token expired' });
      }
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.userId = decoded.userId;
    req.isAdmin = decoded.isAdmin;
    next();
  });
};

module.exports = verifyToken;