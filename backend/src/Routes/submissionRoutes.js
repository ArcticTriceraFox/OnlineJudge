const express = require("express");
const router = express.Router();
const Problem = require("../Models/problem");
const { generateFile } = require("../generateFile");
const { executeCpp } = require("../ExecuteCpp");
const { executePython } = require("../ExecutePython");
const { executeJava } = require("../ExecuteJava");

// Submit code: run against all test cases
router.post("/submit", async (req, res) => {
  const { code, language, problemId } = req.body;
  try {
    const problem = await Problem.findById(problemId);
    if (!problem) return res.status(404).json({ result: "Problem not found" });

    // Parse test cases: support array or string format
    let testCases = [];
    if (Array.isArray(problem.testCases)) {
      testCases = problem.testCases;
    } else {
      testCases = (problem.testCases || "").split("\n").filter(Boolean).map(line => {
        const [input, output] = line.split("|");
        return { input, output };
      });
    }

    let passed = 0, total = testCases.length, details = [];

    for (const { input, output: expected } of testCases) {
      const filepath = await generateFile(language, code);
      let execResult;
      if (language === "cpp") {
        execResult = await executeCpp(filepath, input || "");
      } else if (language === "python") {
        execResult = await executePython(filepath, input || "");
      } else if (language === "java") {
        execResult = await executeJava(filepath, input || "");
      } else {
        return res.status(400).json({ result: "Language not supported." });
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