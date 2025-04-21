const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');  // Extract token from Authorization header

  if (!token) {
    return res.status(401).json({ message: 'No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Decode the token
    const userId = decoded.userId || decoded.id; // ✅ Support both userId and id fields

    if (!userId) {
      return res.status(400).json({ message: 'Invalid token payload.' });
    }

    req.user = await User.findById(userId);  // Find user in DB

    if (!req.user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    next();  // Continue to route handler
  } catch (error) {
    console.error("Authentication Error:", error);
    res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

const adminMiddleware = async (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Admin access required. You do not have permission to view the applications." });
  }
};

module.exports = { authMiddleware, adminMiddleware };
