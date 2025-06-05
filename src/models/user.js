const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["Student", "Alumni", "Faculty"], required: true },
  institution: { type: String, required: true },
  graduationYear: { type: Number },
  profession: { type: String },
  specialization: { type: String },
  bio: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
