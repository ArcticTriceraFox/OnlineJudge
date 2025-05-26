import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProblemDetails() {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState("// Write your code here");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8080/problems/public/${id}`)
      .then(res => res.json())
      .then(data => setProblem(data.problem));
  }, [id]);

  // Run code with sample input (if you want to allow user input, add an input box)
  const handleRun = async (e) => {
    e.preventDefault();
    setLoading(true);
    setOutput("");
    try {
      const response = await fetch("http://localhost:8080/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language: "cpp", code }),
      });
      const data = await response.json();
      if (data.success) {
        setOutput(data.output);
      } else {
        setOutput(data.message || "Error running code");
      }
    } catch (err) {
      setOutput("Network error");
    }
    setLoading(false);
  };

  // Submit code: run against all test cases
  const handleSubmit = async () => {
    setLoading(true);
    setOutput("Submitting...");
    try {
      const response = await fetch("http://localhost:8080/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language: "cpp", code, problemId: id }),
      });
      const data = await response.json();
      setOutput(data.result || data.message || "No output");
    } catch (err) {
      setOutput("Network error");
    }
    setLoading(false);
  };

  if (!problem) return <div>Loading...</div>;

  return (
    <div className="container">
      <h2>{problem.title}</h2>
      <p><strong>Description:</strong> {problem.description}</p>
      <p><strong>Input Format:</strong> {problem.inputFormat}</p>
      <p><strong>Output Format:</strong> {problem.outputFormat}</p>
      <p><strong>Constraints:</strong> {problem.constraints}</p>
      <p><strong>Test Cases:</strong></p>
      <pre>{problem.testCases}</pre>
      <p><strong>Category:</strong> {problem.category}</p>
      <hr />
      <h4>Code Editor</h4>
      <form onSubmit={handleRun}>
        <textarea
          value={code}
          onChange={e => setCode(e.target.value)}
          rows={10}
          style={{ width: "100%", fontFamily: "monospace" }}
        />
        <div className="my-2">
          <button className="btn btn-primary mx-2" type="submit" disabled={loading}>Run</button>
          <button className="btn btn-success" type="button" onClick={handleSubmit} disabled={loading}>Submit</button>
        </div>
      </form>
      <div>
        <strong>Output:</strong>
        <pre>{output}</pre>
      </div>
    </div>
  );
}

export default ProblemDetails;