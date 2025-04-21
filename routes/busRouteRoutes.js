const express = require('express');
const router = express.Router();
const {
  addBusRoute,
  getBusRoutes,
  deleteBusRoute
} = require('../controllers/busRouteController');
const {
  authMiddleware,
  adminMiddleware
} = require('../middleware/authMiddleware');

// ✅ Only GET is available to logged-in users
router.get('/', getBusRoutes);

// ✅ POST and DELETE restricted to admins
router.post('/add', authMiddleware, adminMiddleware, addBusRoute);
router.delete('/delete/:id', authMiddleware, adminMiddleware, deleteBusRoute);

module.exports = router;
