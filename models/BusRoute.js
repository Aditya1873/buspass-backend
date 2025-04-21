// models/BusRoute.js
const mongoose = require('mongoose');

const busRouteSchema = new mongoose.Schema(
  {
    routeName: {
      type: String,
      required: true,
    },
    startPoint: {
      type: String,
      required: true,
    },
    endPoint: {
      type: String,
      required: true,
    },
    timeSchedule: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const BusRoute = mongoose.model('BusRoute', busRouteSchema);

module.exports = BusRoute;
