const mongoose = require("mongoose");

const AnnouncementSchema = new mongoose.Schema({
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
    username: { type: String, required: true }, 
    institution: { type: String, required: true },
    role: { type: String, enum: ["student", "alumni", "faculty"], required: true }, 

    type: {
        type: String,
        enum: ["mentorship", "project", "research", "job", "guidance", "workshop"],
        required: true
    },

    title: { type: String, required: true }, 
    description: { type: String, required: true },

    responsibilities: { type: String }, 
    qualifications: { type: String },   
    lastDate: { type: Date }, 
    tags: [{ type: String }],           
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Announcement", AnnouncementSchema);
