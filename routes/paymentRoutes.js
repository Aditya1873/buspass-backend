const express = require("express");
const { createPayment } = require("../controllers/paymentController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// Make a payment
router.post("/pay", authMiddleware, createPayment);

// Get user's payment history

module.exports = router;
