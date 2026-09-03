const RetailerRequirement = require("../models/RetailerRequirement");
const FarmerListing = require("../models/FarmerListing");

// POST /api/requirements
exports.createRequirement = async (req, res) => {
  try {
    const { retailerName, retailerPhone, crop, quantityNeeded, location, timeline } =
      req.body || {};

    if (!retailerName || !retailerPhone || !crop || quantityNeeded == null || !location) {
      return res.status(400).json({
        error: "retailerName, retailerPhone, crop, quantityNeeded, and location are required"
      });
    }

    const requirement = await RetailerRequirement.create({
      retailerName: String(retailerName).trim(),
      retailerPhone: String(retailerPhone).trim(),
      crop: String(crop).trim(),
      quantityNeeded: Number(quantityNeeded),
      location: String(location).trim(),
      timeline: timeline ? String(timeline).trim() : undefined
    });

    res.status(201).json(requirement);
  } catch (err) {
    console.error("Error creating requirement:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// GET /api/requirements/:id/matches
exports.getRequirementMatches = async (req, res) => {
  try {
    const { id } = req.params;
    const requirement = await RetailerRequirement.findById(id).lean();
    if (!requirement) {
      return res.status(404).json({ error: "Requirement not found" });
    }

    const cropRegex = new RegExp(`^${requirement.crop}$`, "i");

    // Simple location substring matching (city/district level)
    const location = requirement.location || "";
    const locParts = location.split(",").map((s) => s.trim()).filter(Boolean);
    const cityOrDistrict = locParts[0] || "";

    let farmerFilter = { crop: cropRegex };
    // We will apply location filter after fetch to keep it simple and flexible

    const allFarmers = await FarmerListing.find(farmerFilter)
      .sort({ updatedAt: -1 })
      .limit(100)
      .lean();

    const matches = allFarmers
      .filter((f) => {
        if (!f.location) return false;
        if (!cityOrDistrict) {
          return f.location.toLowerCase().includes(location.toLowerCase());
        }
        return (
          f.location.toLowerCase().includes(cityOrDistrict.toLowerCase()) ||
          cityOrDistrict.toLowerCase().includes(f.location.toLowerCase())
        );
      })
      .slice(0, 10)
      .map((f) => ({
        farmerPhone: f.farmerPhone,
        farmerName: f.farmerName,
        crop: f.crop,
        quantityAvailable: f.quantityAvailable,
        pricePerKg: f.pricePerKg,
        location: f.location,
        updatedAt: f.updatedAt
      }));

    res.json({
      requirement,
      matches
    });
  } catch (err) {
    console.error("Error fetching requirement matches:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};


