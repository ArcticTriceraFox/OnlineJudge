const express = require("express");
const router = express.Router();
const Problem = require("../Models/problem");
const { verifyToken, requireRole } = require("../Middlewares/auth");

// Create a new problem (Master only)
router.post("/", verifyToken, requireRole("master"), async (req, res) => {
  try {
    const newProblem = new Problem({ ...req.body, createdBy: req.user.id });
    await newProblem.save();
    res.json({ success: true, message: "Problem created!" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Get all problems created by the logged-in master
router.get("/my", verifyToken, requireRole("master"), async (req, res) => {
  try {
    const problems = await Problem.find({ createdBy: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, problems });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Get all problems in a set (public, for users to browse)
router.get("/set/:setName", async (req, res) => {
  try {
    const problems = await Problem.find({ category: req.params.setName });
    res.json({ success: true, problems });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Get a single problem by ID (Master only, only their own problems)
router.get("/:id", verifyToken, requireRole("master"), async (req, res) => {
  try {
    const problem = await Problem.findOne({ _id: req.params.id, createdBy: req.user.id });
    if (!problem) {
      return res.status(404).json({ success: false, message: "Problem not found or not authorized" });
    }
    res.json({ success: true, problem });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Update a problem by ID (Master only, only their own problems)
router.put("/:id", verifyToken, requireRole("master"), async (req, res) => {
  try {
    const problem = await Problem.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.id },
      req.body,
      { new: true }
    );
    if (!problem) {
      return res.status(404).json({ success: false, message: "Problem not found or not authorized" });
    }
    res.json({ success: true, message: "Problem updated", problem });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Delete a problem by ID (Master only, only their own problems)
router.delete("/:id", verifyToken, requireRole("master"), async (req, res) => {
  try {
    const problem = await Problem.findOneAndDelete({ _id: req.params.id, createdBy: req.user.id });
    if (!problem) {
      return res.status(404).json({ success: false, message: "Problem not found or not authorized" });
    }
    res.json({ success: true, message: "Problem deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/public/:id", async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) {
      return res.status(404).json({ success: false, message: "Problem not found" });
    }
    res.json({ success: true, problem });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;