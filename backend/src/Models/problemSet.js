const mongoose = require("mongoose");

const problemSetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  master: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("ProblemSet", problemSetSchema);