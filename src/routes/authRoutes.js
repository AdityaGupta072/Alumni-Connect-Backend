const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const authenticateUser = require("../middlewares/authMiddleware");
require("dotenv").config();

const router = express.Router();

//  Register Route
router.post("/register", async (req, res) => {
  try {
    console.log("Received signup request:", req.body);

    const {
      name,
      email,
      password,
      role,
      institution,
      graduationYear,
      profession,
      specialization,
      bio
    } = req.body;

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      role,
      institution,
      graduationYear,
      profession,
      specialization,
      bio
    });

    await user.save();

    // Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Return user and token like login
    res.status(201).json({
      message: "User Registered Successfully!",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        institution: user.institution
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

  

//  Login Route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found!" });

        if (!user.password) return res.status(500).json({ message: "Password missing!" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid Credentials!" });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                institution: user.institution
            }
        });
        console.log(token);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//  Protected Route
router.get("/profiles", authenticateUser, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/test", (req, res) => {
    res.send("Auth route is working!");
});

module.exports = router;
