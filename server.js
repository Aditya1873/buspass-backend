const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const busPassRoutes = require("./routes/busPassRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const adminRoutes = require("./routes/adminRoutes");
const busRouteRoutes = require("./routes/busRouteRoutes");
const userRoutes = require("./routes/userRoutes");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000',  // Replace with your frontend's URL
  credentials: true, // Allow cookies and authorization headers
};

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors(corsOptions)); // Enable Cross-Origin Resource Sharing with options

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

app.use("/api/auth", authRoutes);
app.use("/api/buspass", busPassRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/routes", busRouteRoutes);
app.use("/api/users", userRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("🚀 Bus Pass Management API is Running!");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(500).json({ error: err.message || "Server Error" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
console.log('JWT_SECRET:', process.env.JWT_SECRET); // This should output your secret key
