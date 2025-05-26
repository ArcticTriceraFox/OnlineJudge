const express = require("express");
const router = express.Router();
const Problem = require("../Models/problem");

// Import your code execution functions
const { executeCpp } = require("../ExecuteCpp"); // Adjust path as needed
// In the future, you can add: const { executePython } = require("../ExecutePython"); etc.

// Run code with sample input (for "Run" button)
router.post("/run", async (req, res) => {
  const { code, language, input } = req.body;
  try {
    if (language !== "cpp") {
      return res.status(400).json({ success: false, message: "Only C++ is supported right now." });
    }
    const execResult = await executeCpp(code, input || "");
    res.json({ success: true, output: execResult.output });
  } catch (err) {
    res.status(500).json({ success: false, message: "Code execution failed" });
  }
});

// Submit code: run against all test cases
router.post("/submit", async (req, res) => {
  const { code, language, problemId } = req.body;
  try {
    const problem = await Problem.findById(problemId);
    if (!problem) return res.status(404).json({ result: "Problem not found" });

    // Parse test cases: each line is "input|expected_output"
    const testCases = (problem.testCases || "").split("\n").filter(Boolean);
    let passed = 0, total = testCases.length, details = [];

    for (const line of testCases) {
      const [input, expected] = line.split("|");
      // Run code with this input
      let execResult;
      if (language === "cpp") {
        execResult = await executeCpp(code, input || "");
      } else {
        // Future: add support for other languages here
        return res.status(400).json({ result: "Only C++ is supported right now." });
      }
      const actual = (execResult.output || "").trim();
      const exp = (expected || "").trim();
      const ok = actual === exp;
      if (ok) passed++;
      details.push({ input, expected: exp, actual, ok });
    }

    res.json({
      result: `Passed ${passed} out of ${total} test cases.`,
      details
    });
  } catch (err) {
    res.status(500).json({ result: "Submission failed", error: err.message });
  }
});

module.exports = router;