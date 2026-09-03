const mongoose = require("mongoose");

let isConnected = false;

const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error("❌ MONGO_URI not set in .env - API endpoints will not work!");
    console.error("   Please create a .env file with: MONGO_URI=mongodb://localhost:27017/soil2soul");
    return false;
  }

  // If already connected, return true
  if (isConnected && mongoose.connection.readyState === 1) {
    return true;
  }

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    isConnected = true;
    console.log("✅ MongoDB connected successfully");
    console.log(`   Database: ${mongoose.connection.name}`);
    return true;
  } catch (err) {
    isConnected = false;
    console.error("❌ MongoDB connection error:", err.message);
    console.error("   Full error:", err);
    return false;
  }
};

// Handle connection events
mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB connection error:", err);
  isConnected = false;
});

mongoose.connection.on("disconnected", () => {
  console.warn("⚠️  MongoDB disconnected");
  isConnected = false;
});

mongoose.connection.on("reconnected", () => {
  console.log("✅ MongoDB reconnected");
  isConnected = true;
});

module.exports = connectDB;


