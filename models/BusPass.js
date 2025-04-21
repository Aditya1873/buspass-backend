const mongoose = require('mongoose');

const busPassSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  source: { type: String, required: true },
  destination: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  paymentStatus: { type: String, enum: ['pending','unpaid','paid'], default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('BusPass', busPassSchema);
