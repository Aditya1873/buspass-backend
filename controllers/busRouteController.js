// controllers/busRouteController.js
const BusRoute = require('../models/BusRoute');

// Add new bus route
exports.addBusRoute = async (req, res) => {
  try {
    const { routeName, startPoint, endPoint, timeSchedule } = req.body;
    console.log('Adding route:', { routeName, startPoint, endPoint, timeSchedule });

    const newRoute = new BusRoute({
      routeName,
      startPoint,
      endPoint,
      timeSchedule,
    });

    await newRoute.save();
    console.log('Route added successfully:', newRoute);
    res.status(201).json({ message: 'Route added successfully', route: newRoute });
  } catch (error) {
    console.error('Error adding bus route:', error);
    res.status(500).json({ error: 'Server error' });
  }
};


// Get all bus routes
exports.getBusRoutes = async (req, res) => {
  try {
    const routes = await BusRoute.find();
    res.json(routes);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete a bus route
exports.deleteBusRoute = async (req, res) => {
  try {
    const { id } = req.params;
    const route = await BusRoute.findByIdAndDelete(id);
    if (!route) return res.status(404).json({ message: 'Route not found' });
    res.json({ message: 'Route deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
