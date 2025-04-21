// authRoutes.js
const express = require("express");
const router = express.Router();  // Creates a router instance
const { loginUser, registerUser } = require("../controllers/authController");

// Define routes
router.post("/login", loginUser);
router.post("/register", registerUser);

// Export the router
module.exports = router;
