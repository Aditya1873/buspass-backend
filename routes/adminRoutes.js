const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware'); // Make sure both are imported

// 🧍 View all users (optional, if handled elsewhere)
router.get('/users', authMiddleware, adminMiddleware, adminController.getAllUsers);

// 🚌 View all bus pass applications
router.get('/buspasses', authMiddleware, adminMiddleware, adminController.getPendingPasses);

// ✅ Approve a pass
router.patch('/buspass/approve/:id', authMiddleware, adminMiddleware, adminController.approveBusPass);

// ❌ Reject a pass
router.patch('/buspass/reject/:id', authMiddleware, adminMiddleware, adminController.rejectBusPass);

// 💳 View all payments
router.get('/payments', authMiddleware, adminMiddleware, adminController.getAllPayments);

// 🛣️ Manage routes
router.post('/routes', authMiddleware, adminMiddleware, adminController.addBusRoute);
router.put('/routes/:id', authMiddleware, adminMiddleware, adminController.updateBusRoute);
router.delete('/routes/:id', authMiddleware, adminMiddleware, adminController.deleteBusRoute);

module.exports = router;
