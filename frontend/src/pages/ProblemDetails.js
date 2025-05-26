import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProblemDetails() {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState("// Write your code here");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState("");
  const defaultCodes = {
    cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello World";
    return 0;
}`,
    python: `print("Hello World")`,
    java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}`
  };
  const [language, setLanguage] = useState("cpp");

  useEffect(() => {
    fetch(`http://localhost:8080/problems/public/${id}`)
      .then(res => res.json())
      .then(data => setProblem(data.problem));
  }, [id]);

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setLanguage(lang);
    setCode(defaultCodes[lang]);
    setOutput("");
  };

  // Run code with sample input (if you want to allow user input, add an input box)
  const handleRun = async (e) => {
    e.preventDefault();
    setLoading(true);
    setOutput("");
    try {
      const response = await fetch("http://localhost:8080/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language, code, input: userInput }),
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
        body: JSON.stringify({ language, code, problemId: id }),
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
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)', padding: 0, margin: 0 }}>
      <div style={{
        maxWidth: 1200,
        margin: "40px auto",
        background: "#fff",
        borderRadius: 18,
        boxShadow: "0 8px 32px rgba(0,0,0,0.13)",
        padding: 36,
        display: 'flex',
        gap: '2.5rem',
        alignItems: 'flex-start',
        minHeight: '70vh',
      }}>
        {/* Left: Problem Description */}
        <div style={{ flex: 1, minWidth: 0, paddingRight: 24 }}>
          <button
            onClick={() => window.history.back()}
            style={{
              marginBottom: 18,
              background: 'linear-gradient(90deg, #5b86e5 0%, #36d1c4 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '8px 22px',
              fontWeight: 700,
              fontSize: 16,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(91,134,229,0.13)',
              transition: 'background 0.2s',
              outline: 'none',
              display: 'inline-block',
            }}
          >
            ← Back to All Questions
          </button>
          <h2 style={{ fontWeight: 800, fontSize: 32, marginBottom: 18, color: '#232526', textShadow: '0 2px 8px #e0e7ef' }}>{problem.title}</h2>
          <p style={{ fontSize: 18, marginBottom: 10 }}><strong>Description:</strong> <span style={{ color: '#333' }}>{problem.description}</span></p>
          <p style={{ fontSize: 17, marginBottom: 6 }}><strong>Input Format:</strong> <span style={{ color: '#444' }}>{problem.inputFormat}</span></p>
          <p style={{ fontSize: 17, marginBottom: 6 }}><strong>Output Format:</strong> <span style={{ color: '#444' }}>{problem.outputFormat}</span></p>
          <p style={{ fontSize: 17, marginBottom: 6 }}><strong>Constraints:</strong> <span style={{ color: '#444' }}>{problem.constraints}</span></p>
          <p style={{ fontSize: 17, marginBottom: 6 }}><strong>Test Cases:</strong></p>
          <pre style={{ background: "#f8f8f8", padding: "0.7rem", borderRadius: 6, fontSize: 16, color: '#2d3748', marginBottom: 10 }}>{problem.testCases}</pre>
          <p style={{ fontSize: 17, marginBottom: 0 }}><strong>Category:</strong> <span style={{ color: '#555' }}>{problem.category}</span></p>
        </div>
        {/* Right: Code Editor and Output */}
        <div style={{ flex: 1, minWidth: 0, background: "#f4f6fa", padding: "1.5rem", borderRadius: 12, boxShadow: "0 2px 8px #0001", display: 'flex', flexDirection: 'column', gap: 12 }}>
          <h4 style={{ fontWeight: 700, fontSize: 22, marginBottom: 10, color: '#232526' }}>Code Editor</h4>
          <form onSubmit={handleRun} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <label htmlFor="language" style={{ fontWeight: 600, fontSize: 17 }}>Language:</label>
              <select
                id="language"
                value={language}
                onChange={handleLanguageChange}
                style={{ padding: "6px 12px", borderRadius: 6, fontSize: 16, background: '#fff', border: '1px solid #d1d5db' }}
              >
                <option value="cpp">C++</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
              </select>
            </div>
            <div>
              <label htmlFor="userInput" style={{ fontWeight: 600, fontSize: 17 }}>Input:</label>
              <textarea
                id="userInput"
                value={userInput}
                onChange={e => setUserInput(e.target.value)}
                rows={3}
                style={{ width: "100%", fontFamily: "Fira Mono, monospace", fontSize: 15, borderRadius: 6, padding: 8, resize: "vertical", marginTop: 4, background: '#fff', border: '1px solid #d1d5db' }}
                placeholder="Enter custom input for your code (for Run only)"
              />
            </div>
            <textarea
              value={code}
              onChange={e => setCode(e.target.value)}
              rows={12}
              style={{ width: "100%", fontFamily: "Fira Mono, monospace", fontSize: 16, borderRadius: 8, padding: 10, resize: "vertical", background: '#fff', border: '1px solid #d1d5db' }}
            />
            <div style={{ display: 'flex', gap: 16, margin: "1rem 0" }}>
              <button className="btn btn-primary mx-2" type="submit" disabled={loading}
                style={{
                  background: 'linear-gradient(90deg, #36d1c4 0%, #5b86e5 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '10px 28px',
                  fontWeight: 700,
                  fontSize: 18,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  boxShadow: '0 2px 8px rgba(91,134,229,0.13)',
                  transition: 'background 0.2s',
                  outline: 'none',
                }}
              >Run</button>
              <button className="btn btn-success" type="button" onClick={handleSubmit} disabled={loading}
                style={{
                  background: 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '10px 28px',
                  fontWeight: 700,
                  fontSize: 18,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  boxShadow: '0 2px 8px rgba(67,233,123,0.13)',
                  transition: 'background 0.2s',
                  outline: 'none',
                }}
              >Submit</button>
            </div>
          </form>
          <div style={{ maxHeight: 220, overflowY: "auto", background: "#fff", border: "1px solid #eee", borderRadius: 6, padding: 10, marginTop: 8 }}>
            <strong style={{ color: '#232526', fontSize: 16 }}>Output:</strong>
            <pre style={{ margin: 0, color: '#222', fontSize: 16 }}>{output}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProblemDetails;