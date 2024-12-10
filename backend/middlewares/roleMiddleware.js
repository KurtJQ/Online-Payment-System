import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

// Middleware to authenticate JWT
const authenticateJWT = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];  // Assuming token is in the Authorization header as "Bearer <token>"

  if (!token) {
    return res.status(403).json({ message: 'Access denied, token missing' });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
    if (err) {
      console.log('JWT Error:', err);  // Log detailed error for debugging
      return res.status(403).json({ message: 'Invalid token' });
    }

    // Ensure the token contains userId and role
    if (!decoded || !decoded.userId || !decoded.role) {
      return res.status(403).json({ message: 'Invalid token structure' });
    }

    // Fetch user details based on the decoded userId
    const currentUser = await User.findByPk(decoded.userId);
    if (!currentUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Attach user data to the request object for further use in the request lifecycle
    req.user = currentUser;
    next(); // Move to the next middleware or route handler
  });
};

// Middleware to ensure the user is an admin or super admin
const isAdminOrSuperAdmin = (req, res, next) => {
  if (req.user.role !== 'admin' && req.user.role !== 'super_admin') {
    return res.status(403).json({ message: 'Access denied, requires admin or super admin role' });
  }
  next();
};

// Middleware to ensure the user is a super admin
const isSuperAdmin = (req, res, next) => {
  if (req.user.role !== 'super_admin') {
    return res.status(403).json({ message: 'Access denied, requires super admin role' });
  }
  next();
};

export { authenticateJWT, isAdminOrSuperAdmin, isSuperAdmin };
