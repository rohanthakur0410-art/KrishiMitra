const mongoose = require("mongoose");

const FarmerListingSchema = new mongoose.Schema({
  farmerPhone: {
    type: String,
    required: true,
    trim: true
  },
  farmerName: {
    type: String,
    trim: true
  },
  crop: {
    type: String,
    required: true,
    trim: true
  },
  quantityAvailable: {
    type: Number,
    required: true,
    min: 0
  },
  pricePerKg: {
    type: Number,
    required: true,
    min: 0
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  notes: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Helpful compound index for upsert (phone + crop)
FarmerListingSchema.index({ farmerPhone: 1, crop: 1 });

module.exports = mongoose.model("FarmerListing", FarmerListingSchema);


