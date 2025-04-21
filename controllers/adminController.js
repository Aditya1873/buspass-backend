const User = require("../models/User");
const BusPass = require("../models/BusPass");
const Payment = require("../models/Payment");
const BusRoute = require("../models/BusRoute");

// ✅ View all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error fetching users" });
  }
};

// 🚌 View all bus pass applications (pending)
exports.getPendingPasses = async (req, res) => {
  try {
    const pendingPasses = await BusPass.find({ status: "pending" })
      .populate("user", "name email");
    res.json(pendingPasses);
  } catch (error) {
    res.status(500).json({ error: "Error fetching bus passes" });
  }
};

// ✅ Approve bus pass
exports.approveBusPass = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedPass = await BusPass.findByIdAndUpdate(id, { status: "approved" }, { new: true });
    res.json(updatedPass);
  } catch (error) {
    res.status(500).json({ error: "Error approving bus pass" });
  }
};

// ❌ Reject bus pass
exports.rejectBusPass = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedPass = await BusPass.findByIdAndUpdate(id, { status: "rejected" }, { new: true });
    res.json(updatedPass);
  } catch (error) {
    res.status(500).json({ error: "Error rejecting bus pass" });
  }
};

// 💳 View all payments
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate("user", "name email");
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: "Error fetching payments" });
  }
};

// ➕ Add a new bus route
exports.addBusRoute = async (req, res) => {
  const { source, destination } = req.body;
  try {
    const newRoute = new BusRoute({ source, destination });
    await newRoute.save();
    res.status(201).json(newRoute);
  } catch (error) {
    res.status(500).json({ error: "Error creating route" });
  }
};

// ✏️ Update bus route
exports.updateBusRoute = async (req, res) => {
  const { id } = req.params;
  const { source, destination } = req.body;
  try {
    const updatedRoute = await BusRoute.findByIdAndUpdate(id, { source, destination }, { new: true });
    res.json(updatedRoute);
  } catch (error) {
    res.status(500).json({ error: "Error updating route" });
  }
};

// ❌ Delete bus route
exports.deleteBusRoute = async (req, res) => {
  const { id } = req.params;
  try {
    await BusRoute.findByIdAndDelete(id);
    res.json({ message: "Route deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting route" });
  }
};
