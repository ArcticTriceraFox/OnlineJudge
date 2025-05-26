const express = require("express");
const router = express.Router();
const ProblemSet = require("../Models/problemSet");
const { verifyToken, requireRole } = require("../Middlewares/auth");

// Create a new problem set (Master only)
router.post("/", verifyToken, requireRole("master"), async (req, res) => {
  try {
    const { name, description } = req.body;
    const newSet = new ProblemSet({
      name,
      description,
      master: req.user.id
    });
    await newSet.save();
    res.json({ success: true, message: "Problem set created!", problemSet: newSet });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Get all problem sets for the logged-in master
router.get("/my", verifyToken, requireRole("master"), async (req, res) => {
  try {
    const sets = await ProblemSet.find({ master: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, problemSets: sets });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Get all problem sets (public, for users to browse)
router.get("/", async (req, res) => {
  try {
    const sets = await ProblemSet.find().populate("master", "firstName lastName");
    res.json({ success: true, problemSets: sets });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Delete a problem set (Master only, only their own)
router.delete("/:id", verifyToken, requireRole("master"), async (req, res) => {
  try {
    const set = await ProblemSet.findOneAndDelete({ _id: req.params.id, master: req.user.id });
    if (!set) {
      return res.status(404).json({ success: false, message: "Problem set not found or not authorized" });
    }
    res.json({ success: true, message: "Problem set deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;