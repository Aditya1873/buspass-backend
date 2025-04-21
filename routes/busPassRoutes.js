const express = require("express");
const router = express.Router();

const {
  applyBusPass,
  getMyPasses,
  getAllBusPassApplications,
  approveBusPass,
  rejectBusPass,
  updatePaymentStatus,
  getBusPassById 
} = require("../controllers/busPassController");

const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");

// 🧑 User: Apply for Bus Pass
router.post("/apply", authMiddleware, applyBusPass);

// 🧑 User: Get their own passes
router.get("/mypasses", authMiddleware, getMyPasses);

// 🔐 Admin: View all applications
router.get("/applications", authMiddleware, adminMiddleware, getAllBusPassApplications);

// 🔐 Admin: Approve a pass
router.put("/approve/:id", authMiddleware, adminMiddleware, approveBusPass);

// 🔐 Admin: Reject a pass
router.put("/reject/:id", authMiddleware, adminMiddleware, rejectBusPass);

router.patch("/payment/:passId", authMiddleware, updatePaymentStatus);
router.get("/:passId", authMiddleware, getBusPassById);
module.exports = router;
