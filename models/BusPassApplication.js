const mongoose = require('mongoose');

const busPassApplicationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  },
  route: {
    type: String,
    required: true
  },
  appliedAt: {
    type: Date,
    default: Date.now
  }
});

const BusPassApplication = mongoose.model('BusPassApplication', busPassApplicationSchema);

module.exports = BusPassApplication;
