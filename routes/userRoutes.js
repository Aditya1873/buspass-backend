const express = require("express");
const {
  getUserProfile,
  getAllUsers,  // ✅ this was missing
} = require("../controllers/userController");
const {
  authMiddleware,
  adminMiddleware,
} = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ User profile route
router.get("/profile", authMiddleware, getUserProfile);

// ✅ Admin route to get all users
router.get("/all", authMiddleware, adminMiddleware, getAllUsers); // ✅ Corrected

module.exports = router;
