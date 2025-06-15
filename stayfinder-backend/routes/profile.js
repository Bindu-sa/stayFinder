const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");

router.get("/", verifyToken, (req, res) => {
  res.json({ message: "Welcome, authorized user!", userId: req.user.id });
});

module.exports = router;
