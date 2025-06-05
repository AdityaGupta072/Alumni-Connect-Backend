const express = require("express");
const router = express.Router();
const Announcement = require("../models/announcement");
const authenticateUser = require("../middlewares/authMiddleware");

// Create an Announcement
router.post("/create", authenticateUser, async (req, res) => {
    try {
        const {
            username, institution, role, type, title, description,
            responsibilities, qualifications, lastDate, tags
        } = req.body;

        // Validation
        if (!username || !institution || !role || !type || !title || !description) {
            return res.status(400).json({ message: "All required fields must be filled." });
        }

        const newAnnouncement = new Announcement({
            postedBy: req.user.id, 
            username,
            institution,
            role,
            type,
            title,
            description,
            responsibilities,
            qualifications,
            lastDate: lastDate ? new Date(lastDate) : null,  // Ensure lastDate is a Date object
            tags: Array.isArray(tags) ? tags.map(tag => tag.trim()) : []
 // Parse tags if present
        });

        // Save the announcement
        const saved = await newAnnouncement.save();
        res.status(201).json(saved);
    } catch (error) {
        console.error("Error creating announcement:", error);
        res.status(500).json({ error: error.message });
    }
});


// Get all announcements or filter them using query params
router.get("/", async (req, res) => {
    const { type, institution, visibility, tags } = req.query; // Fetch query parameters

    try {
        let query = {};

        if (type) query.type = type;
        if (institution) query.institution = institution;
        if (visibility) query.visibleTo = visibility;  
        if (tags) query.tags = { $in: tags.split(',') };

        
        const announcements = await Announcement.find(query).sort({ createdAt: -1 });
        res.json(announcements);  
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', authenticateUser, async (req, res) => {
  try {
    console.log('Authenticated user:', req.user);
    const announcementId = req.params.id;
    console.log('Deleting announcement ID:', announcementId);

    const announcement = await Announcement.findById(announcementId);
    if (!announcement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }

    if (announcement.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this announcement' });
    }

    await announcement.deleteOne(); // updated from remove()

    res.status(200).json({ message: 'Announcement deleted successfully' });
  } catch (error) {
    console.error('Error deleting announcement:', error);
    res.status(500).json({ message: 'Server error deleting announcement', error: error.message });
  }
});


// Filter announcements by type, institution, visibility, and tags
router.post('/filter', async (req, res) => {
    const { type, institution, visibility, tags } = req.body;

    try {
        const query = {
            ...(type && { type }),
            ...(institution && { institution }),
            ...(visibility && { visibility }),  // Adjusted visibility field if needed
            ...(tags && { tags: { $in: tags.split(',').map(tag => tag.trim()) } }) // Parse tags
        };

        const announcements = await Announcement.find(query).sort({ createdAt: -1 });
        res.json(announcements);
    } catch (err) {
        console.error("Error filtering announcements:", err);
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;
