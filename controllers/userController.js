const User = require('../models/User');
const BusPass = require('../models/BusPass');
const Payment = require('../models/Payment'); // Assuming you have a Payment model
const moment = require('moment');

// Get profile for currently logged-in user
const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const activePass = await BusPass.findOne({
      user: userId,
      status: 'approved',
    });

    let remainingDays = null;
    if (activePass && activePass.validTill) {
      const today = moment().startOf('day');
      const expiryDate = moment(activePass.validTill).startOf('day');
      remainingDays = expiryDate.diff(today, 'days');
    }

    res.json({
      user: {
        name: user.name,
        email: user.email,
      },
      pass: activePass
        ? {
            source: activePass.source,
            destination: activePass.destination,
            status: activePass.status,
            paymentStatus: activePass.paymentStatus,
            validTill: activePass.validTill,
          }
        : null,
      remainingDays,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Get all user profiles with active pass & remaining days — ADMIN
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    const usersWithPassAndPayment = await Promise.all(
      users.map(async (user) => {
        const pass = await BusPass.findOne({ user: user._id });
        const payment = await Payment.findOne({ user: user._id });

        if (!pass) return null; // Skip if there's no pass

        return {
          name: user.name,
          email: user.email,
          pass: {
            source: pass.source || 'N/A',
            destination: pass.destination || 'N/A',
            paymentStatus: payment?.status || 'Not Paid',
            status: pass.status || 'Not Approved',
          }
        };
      })
    );

    const filteredUsers = usersWithPassAndPayment.filter(Boolean); // Remove nulls
    res.json(filteredUsers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};



module.exports = {
  getAllUsers, // for fetching detailed user information
  getUserProfile
};
