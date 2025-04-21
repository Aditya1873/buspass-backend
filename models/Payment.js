const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  passId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BusPass',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentDate: {
    type: Date,
    default: Date.now,
  },
  paymentMethod: {
    type: String,
    enum: ['card', 'upi', 'netbanking', 'cash'],
    default: 'upi',
  },
  status: {
    type: String,
    enum: ['success', 'failed', 'pending'],
    default: 'success',
  },
});

module.exports = mongoose.model('Payment', paymentSchema);
