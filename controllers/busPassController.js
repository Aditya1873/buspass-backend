const mongoose = require("mongoose"); // ✅ FIX: required for ObjectId validation
const BusPass = require("../models/BusPass");
const BusPassApplication = require('../models/BusPassApplication');


// 🧑‍💼 User: Apply for a Bus Pass
/*const applyBusPass = async (req, res) => {
  try {
    console.log("🔥 Request Body:", req.body);
    console.log("👤 User ID:", req.user?._id);

    const { source, destination } = req.body;
    const userId = req.user._id;

    if (!source || !destination) {
      return res.status(400).json({ message: "Both source and destination are required." });
    }

    const existingPass = await BusPass.findOne({
      user: userId,
      status: { $in: ['pending', 'approved'] }
    });

    if (existingPass) {
      return res.status(400).json({ message: "You already have an active/pending bus pass." });
    }

    const newPass = new BusPass({
      user: userId,
      source,
      destination,
      status: "pending",
      paymentStatus: "pending",
    });

    await newPass.save();
    res.status(201).json({ message: "Bus Pass Application Submitted!" });

  } catch (error) {
    console.error("🔥 Apply Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
const applyBusPass = async (req, res) => {
  try {
    console.log("🔥 Request Body:", req.body);
    console.log("👤 User ID:", req.user?._id);

    const { source, destination } = req.body;
    const userId = req.user._id;

    if (!source || !destination) {
      return res.status(400).json({ message: "Both source and destination are required." });
    }

    const existingPass = await BusPass.findOne({
      user: userId,
      status: { $in: ['pending', 'approved'] }
    });

    if (existingPass) {
      return res.status(400).json({ message: "You already have an active/pending bus pass." });
    }

    const newPass = new BusPass({
      user: userId,
      source,
      destination,
      status: "pending",
      paymentStatus: "pending",
    });

    await newPass.save();

    // Return the new pass with its ID
    res.status(201).json({
      message: "Bus Pass Application Submitted!",
      pass: newPass, // Pass object containing _id and other data
    });

  } catch (error) {
    console.error("🔥 Apply Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};*/
const applyBusPass = async (req, res) => {
  try {
    console.log("🔥 Request Body:", req.body);
    console.log("👤 User ID:", req.user?._id);

    const { source, destination } = req.body;
    const userId = req.user._id;

    if (!source || !destination) {
      return res.status(400).json({ message: "Both source and destination are required." });
    }

    const existingPass = await BusPass.findOne({
      user: userId,
      status: { $in: ['pending', 'approved'] }
    });

    if (existingPass) {
      return res.status(400).json({ message: "You already have an active/pending bus pass." });
    }

    const newPass = new BusPass({
      user: userId,
      source,
      destination,
      status: "pending",
      paymentStatus: "pending",
    });

    await newPass.save();

    // Return only the passId after creating the bus pass
    res.status(201).json({
      message: "Bus Pass Application Submitted!",
      passId: newPass._id, // Return only the passId
    });

  } catch (error) {
    console.error("🔥 Apply Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};



// 🧑‍💼 User: Get their Bus Passes
const getMyPasses = async (req, res) => {
  try {
    const passes = await BusPass.find({ user: req.user._id });
    res.json(passes); // 👈 Send all passes
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve your bus passes." });
  }
};

// 🔐 Admin: Get All Bus Pass Applications
/*const getAllBusPassApplications = async (req, res) => {
  try {
    const applications = await BusPass.find()
      .populate('user', 'name email') // Populates user's name and email
      .sort({ createdAt: -1 });

    res.status(200).json(applications);
  } catch (error) {
    console.error('Error fetching bus pass applications:', error);
    res.status(500).json({ message: 'Failed to fetch bus pass applications' });
  }
};*/


const getAllBusPassApplications = async (req, res) => {
  try {
    const applications = await BusPass.find()
      .populate('user', 'name email');  // Fetch both name and email fields from User model

    res.status(200).json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Admin: Approve bus pass
/*const approveBusPass = async (req, res) => {
  try {
    const busPass = await BusPass.findById(req.params.id);
    if (!busPass) return res.status(404).json({ message: 'Bus pass not found' });

    busPass.status = 'approved';
    busPass.paymentStatus = 'paid'; // Optional: update payment on approval
    await busPass.save();

    res.status(200).json({ message: 'Bus pass approved successfully' });
  } catch (error) {
    console.error('Error approving bus pass:', error);
    res.status(500).json({ message: 'Failed to approve bus pass' });
  }
};*/
// In controllers/busPassController.js
const approveBusPass = async (req, res) => {
  try {
    const busPass = await BusPass.findById(req.params.id);
    if (!busPass) {
      return res.status(404).json({ message: 'Bus pass not found' });
    }

    busPass.status = 'approved';
    busPass.paymentStatus = 'unpaid'; // Set to unpaid until payment is done
   
    await busPass.save();

    res.status(200).json({ message: 'Bus pass approved successfully', busPass });
  } catch (error) {
    console.error('Error approving bus pass:', error);
    res.status(500).json({ message: 'Failed to approve bus pass' });
  }
};


// Admin: Reject bus pass
const rejectBusPass = async (req, res) => {
  try {
    const busPass = await BusPass.findById(req.params.id);
    if (!busPass) return res.status(404).json({ message: 'Bus pass not found' });

    busPass.status = 'rejected';
    await busPass.save();

    res.status(200).json({ message: 'Bus pass rejected successfully' });
  } catch (error) {
    console.error('Error rejecting bus pass:', error);
    res.status(500).json({ message: 'Failed to reject bus pass' });
  }
};
const updatePaymentStatus = async (req, res) => {
  const { passId } = req.params;

  try {
    // Find the bus pass by ID
    const pass = await BusPass.findById(passId);

    if (!pass) {
      return res.status(404).json({ message: 'Bus pass not found' });
    }

    // Ensure the pass is approved and payment is unpaid before updating
    if (pass.status === 'approved' && pass.paymentStatus === 'unpaid') {
      pass.paymentStatus = 'paid'; // Update payment status to 'paid'
      await pass.save();

      res.status(200).json({ message: 'Payment status updated successfully', pass });
    } else {
      return res.status(400).json({ message: 'Pass is not eligible for payment or already paid' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating payment status' });
  }
};
const getBusPassById = async (req, res) => {
  try {
    const pass = await BusPass.findById(req.params.id).populate('user', 'name email');

    if (!pass) {
      return res.status(404).json({ message: 'Bus pass not found' });
    }

    res.status(200).json(pass);
  } catch (error) {
    console.error('Error fetching bus pass:', error.message);
    res.status(500).json({ message: 'Server error while fetching bus pass' });
  }
};

module.exports = {
  getAllBusPassApplications,
  approveBusPass,
  rejectBusPass,
  applyBusPass,
  getMyPasses,
  updatePaymentStatus,
  getBusPassById 
};