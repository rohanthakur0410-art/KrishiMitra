const mongoose = require("mongoose");

const farmerSchema = new mongoose.Schema({
  farmerPhone: {
    type: String,
    required: true,
    unique: true,
  },
  farmerName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 4.5,
    min: 0,
    max: 5,
  },
  ratingCount: {
    type: Number,
    default: 0,
  },
  experienceYears: {
    type: Number,
    default: 5,
  },
  primaryCrops: [{
    type: String,
  }],
  imageUrl: {
    type: String,
  },
  farmerId: {
    type: String,
    unique: true,
  },
  verified: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Generate farmerId before saving
farmerSchema.pre("save", function(next) {
  if (!this.farmerId) {
    const phoneHash = this.farmerPhone.replace(/[^0-9]/g, "").slice(-6);
    this.farmerId = `FMR-2025-${phoneHash}`;
  }
  next();
});

module.exports = mongoose.model("Farmer", farmerSchema);

