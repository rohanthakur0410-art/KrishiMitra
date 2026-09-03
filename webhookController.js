const FarmerListing = require("../models/FarmerListing");
const RetailerRequirement = require("../models/RetailerRequirement");

// Helper: basic case-insensitive includes
const includesCI = (haystack, needle) => {
  if (!haystack || !needle) return false;
  return haystack.toLowerCase().includes(needle.toLowerCase());
};

exports.handleFarmerUpdate = async (req, res) => {
  try {
    console.log("[WEBHOOK] Received farmer update request:", JSON.stringify(req.body, null, 2));
    
    const {
      phone,
      farmerName,
      crop,
      quantity,
      price,
      location,
      notes
    } = req.body || {};

    // Validate required fields
    if (!phone || !crop || quantity == null || price == null || !location) {
      console.log("[WEBHOOK] Validation failed - missing fields:", { 
        phone: !!phone, 
        crop: !!crop, 
        quantity, 
        price, 
        location: !!location 
      });
      return res.status(400).json({
        error: "phone, crop, quantity, price, and location are required",
        received: { phone: !!phone, crop: !!crop, quantity, price, location: !!location }
      });
    }

    // Check MongoDB connection
    const mongoose = require("mongoose");
    if (mongoose.connection.readyState !== 1) {
      console.error("[WEBHOOK] MongoDB not connected! State:", mongoose.connection.readyState);
      return res.status(503).json({
        error: "Database not connected. Please check MongoDB connection."
      });
    }

    // Prepare data
    const farmerPhone = String(phone).trim();
    const cropName = String(crop).trim();
    const quantityNum = Number(quantity);
    const priceNum = Number(price);
    const locationStr = String(location).trim();

    // Validate numbers
    if (isNaN(quantityNum) || quantityNum < 0) {
      return res.status(400).json({ error: "Invalid quantity. Must be a non-negative number." });
    }
    if (isNaN(priceNum) || priceNum < 0) {
      return res.status(400).json({ error: "Invalid price. Must be a non-negative number." });
    }

    const filter = { 
      farmerPhone: farmerPhone, 
      crop: cropName 
    };
    
    // Check if listing exists
    const existingListing = await FarmerListing.findOne(filter);
    const now = new Date();
    
    const update = {
      farmerPhone: farmerPhone,
      crop: cropName,
      quantityAvailable: quantityNum,
      pricePerKg: priceNum,
      location: locationStr,
      updatedAt: now
    };

    // Set createdAt only for new documents
    if (!existingListing) {
      update.createdAt = now;
    }

    // Add optional fields only if provided
    if (farmerName) {
      update.farmerName = String(farmerName).trim();
    }
    if (notes) {
      update.notes = String(notes).trim();
    }

    console.log("[WEBHOOK] Upserting listing with filter:", filter);
    console.log("[WEBHOOK] Update data:", update);
    console.log("[WEBHOOK] Is new listing:", !existingListing);

    // Upsert the listing
    const listing = await FarmerListing.findOneAndUpdate(
      filter,
      { $set: update },
      { 
        new: true, 
        upsert: true, 
        setDefaultsOnInsert: true,
        runValidators: true
      }
    );

    if (!listing) {
      throw new Error("Failed to save listing - findOneAndUpdate returned null");
    }

    console.log("[WEBHOOK] ✅ Listing saved successfully!");
    console.log("[WEBHOOK]   ID:", listing._id);
    console.log("[WEBHOOK]   Crop:", listing.crop);
    console.log("[WEBHOOK]   Location:", listing.location);
    console.log("[WEBHOOK]   Quantity:", listing.quantityAvailable);
    console.log("[WEBHOOK]   Price:", listing.pricePerKg);

    // Find matching retailer requirements
    let matches = [];
    try {
      const cropRegex = new RegExp(`^${listing.crop}$`, "i");
      const allReqs = await RetailerRequirement.find({
        crop: cropRegex
      })
        .sort({ createdAt: -1 })
        .limit(20)
        .lean();

      const loc = listing.location || "";
      const locationParts = loc.split(",").map((s) => s.trim()).filter(Boolean);
      const cityOrDistrict = locationParts[0] || "";

      matches = allReqs
        .filter((reqDoc) => {
          if (!reqDoc.location) return false;
          if (!cityOrDistrict) return includesCI(reqDoc.location, loc);
          return (
            includesCI(reqDoc.location, cityOrDistrict) ||
            includesCI(cityOrDistrict, reqDoc.location)
          );
        })
        .slice(0, 5)
        .map((m) => ({
          retailerName: m.retailerName,
          retailerPhone: m.retailerPhone,
          crop: m.crop,
          quantityNeeded: m.quantityNeeded,
          location: m.location,
          timeline: m.timeline,
          createdAt: m.createdAt
        }));

      console.log("[WEBHOOK] Found", matches.length, "matching retailer requirements");
    } catch (matchErr) {
      console.warn("[WEBHOOK] Error finding matches (non-critical):", matchErr.message);
      // Don't fail the request if matching fails
    }

    return res.json({
      message: "Listing saved successfully",
      listing: {
        _id: listing._id,
        farmerPhone: listing.farmerPhone,
        farmerName: listing.farmerName,
        crop: listing.crop,
        quantityAvailable: listing.quantityAvailable,
        pricePerKg: listing.pricePerKg,
        location: listing.location,
        updatedAt: listing.updatedAt
      },
      matches
    });
  } catch (err) {
    console.error("[WEBHOOK] ❌ Error:", err);
    console.error("[WEBHOOK] Stack trace:", err.stack);
    return res.status(500).json({ 
      error: "Internal server error",
      message: err.message 
    });
  }
};


