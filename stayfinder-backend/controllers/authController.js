const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ✅ Register User
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 👀 Log incoming credentials
    console.log("🔐 Login attempt:", email);

    const user = await User.findOne({ email });

    // 🚫 No user found
    if (!user) {
      console.log("❌ User not found:", email);
      return res.status(404).json({ message: "User not found" });
    }

    // 🔍 Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🔄 Password match:", isMatch);

    // 🚫 Password didn't match
    if (!isMatch) {
      console.log("❌ Invalid password for:", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // ✅ Login successful
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    console.log("✅ Login success:", email);
    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error("❗Server error during login:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Final Fix: Export BOTH properly
module.exports = {
  registerUser,
  loginUser,
};
