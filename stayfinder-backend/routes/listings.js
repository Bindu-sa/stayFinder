const express = require("express");
const router = express.Router();
const {
  createListing,
  getAllListings,
} = require("../controllers/listingController");

// POST /api/listings
router.post("/", createListing);

// GET /api/listings
router.get("/", getAllListings);

module.exports = router;
