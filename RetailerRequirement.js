const mongoose = require("mongoose");

const RetailerRequirementSchema = new mongoose.Schema({
  retailerName: {
    type: String,
    required: true,
    trim: true
  },
  retailerPhone: {
    type: String,
    required: true,
    trim: true
  },
  crop: {
    type: String,
    required: true,
    trim: true
  },
  quantityNeeded: {
    type: Number,
    required: true,
    min: 0
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  timeline: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

RetailerRequirementSchema.index({ crop: 1, location: 1, createdAt: -1 });

module.exports = mongoose.model("RetailerRequirement", RetailerRequirementSchema);


