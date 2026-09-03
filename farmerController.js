const FarmerListing = require("../models/FarmerListing");

exports.getListings = async (req, res) => {
  try {
    // Check MongoDB connection
    const mongoose = require("mongoose");
    if (mongoose.connection.readyState !== 1) {
      console.error("[API] MongoDB not connected! State:", mongoose.connection.readyState);
      return res.status(503).json({
        error: "Database not connected. Please check MongoDB connection."
      });
    }

    const { crop, location } = req.query;
    const filter = {};

    if (crop) {
      filter.crop = { $regex: crop.trim(), $options: "i" };
    }
    if (location) {
      filter.location = { $regex: location.trim(), $options: "i" };
    }

    console.log("[API] Fetching listings with filter:", filter);

    const listings = await FarmerListing.find(filter)
      .sort({ updatedAt: -1 })
      .lean();

    console.log("[API] Found", listings.length, "listings");

    res.json(listings);
  } catch (err) {
    console.error("[API] ❌ Error fetching farmer listings:", err);
    console.error("[API] Stack trace:", err.stack);
    res.status(500).json({ 
      error: "Internal server error",
      message: err.message 
    });
  }
};


