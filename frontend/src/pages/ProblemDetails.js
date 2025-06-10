import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProblemDetails() {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState("// Write your code here");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [aiReview, setAiReview] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    // Persist dark mode preference in localStorage
    return localStorage.getItem('darkMode') === 'true';
  });
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
    fetch(`${process.env.REACT_APP_BACKEND_URL}/problems/public/${id}`)
      .then(res => res.json())
      .then(data => setProblem(data.problem));
  }, [id]);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

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
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/run`, {
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
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/submit`, {
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

  // AI Review handler
  const handleAIReview = async () => {
    setAiLoading(true);
    setAiReview("");
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/ai-review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language,
          code,
          problemTitle: problem.title,
          problemDescription: problem.description
        }),
      });
      const data = await response.json();
      if (data.success) {
        setAiReview(data.review);
      } else {
        setAiReview(data.message || "AI review failed");
      }
    } catch (err) {
      setAiReview("Network error");
    }
    setAiLoading(false);
  };

  if (!problem) return <div>Loading...</div>;

  // Theme styles
  const theme = darkMode
    ? {
        background: 'linear-gradient(135deg, #232526 0%, #414345 100%)',
        cardBg: '#23272f',
        text: '#f8fafc',
        subText: '#b5bac6',
        codeBg: '#181a20',
        border: '#333',
        aiBg: '#23272f',
        aiBorder: '#444',
        aiText: '#ffe59e',
        aiStrong: '#ffe259',
        btnBg: 'linear-gradient(90deg, #232526 0%, #36d1c4 100%)',
        btnText: '#fff',
      }
    : {
        background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)',
        cardBg: '#fff',
        text: '#232526',
        subText: '#444',
        codeBg: '#f4f6fa',
        border: '#e0e7ef',
        aiBg: '#fffbe6',
        aiBorder: '#ffe59e',
        aiText: '#232526',
        aiStrong: '#b8860b',
        btnBg: 'linear-gradient(90deg, #5b86e5 0%, #36d1c4 100%)',
        btnText: '#fff',
      };

  return (
    <div
      className={`problem-details-root ${theme}-mode`}
      style={{
        minHeight: '100vh',
        width: '100vw',
        background: theme === 'dark'
          ? 'linear-gradient(135deg, #181c24 0%, #232b3a 100%)'
          : 'linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '32px 0',
      }}
    >
      <div
        className="problem-details-card"
        style={{
          width: '100%',
          maxWidth: 1400,
          minWidth: 320,
          borderRadius: 18,
          boxShadow:
            theme === 'dark'
              ? '0 8px 32px rgba(20,20,30,0.7)'
              : '0 8px 32px rgba(66,68,90,0.13)',
          background:
            theme === 'dark'
              ? 'rgba(30,34,44,0.97)'
              : 'rgba(255,255,255,0.97)',
          padding: '36px 32px',
          display: 'flex',
          flexDirection: 'row',
          gap: 48,
          marginTop: 56, // Adjusted marginTop to avoid overlap with nav bar
        }}
      >
        {/* Left: Problem description */}
        <div style={{ flex: 1, minWidth: 320 }}>
          {/* Theme Switcher */}
          <button
            onClick={() => setDarkMode((d) => !d)}
            style={{
              position: 'absolute',
              top: 24,
              right: 36,
              background: theme.btnBg,
              color: theme.btnText,
              border: 'none',
              borderRadius: 8,
              padding: '8px 18px',
              fontWeight: 700,
              fontSize: 15,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(91,134,229,0.13)',
              transition: 'background 0.2s',
              outline: 'none',
              zIndex: 10,
            }}
          >
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
          <button
            onClick={() => window.history.back()}
            style={{
              marginBottom: 18,
              background: theme.btnBg,
              color: theme.btnText,
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
          <h2 style={{ fontWeight: 800, fontSize: 32, marginBottom: 18, color: theme.text, textShadow: darkMode ? '0 2px 8px #232526' : '0 2px 8px #e0e7ef' }}>{problem.title}</h2>
          <p style={{ fontSize: 18, marginBottom: 10 }}><strong>Description:</strong> <span style={{ color: theme.subText }}>{problem.description}</span></p>
          <p style={{ fontSize: 17, marginBottom: 6 }}><strong>Input Format:</strong> <span style={{ color: theme.subText }}>{problem.inputFormat}</span></p>
          <p style={{ fontSize: 17, marginBottom: 6 }}><strong>Output Format:</strong> <span style={{ color: theme.subText }}>{problem.outputFormat}</span></p>
          <p style={{ fontSize: 17, marginBottom: 6 }}><strong>Constraints:</strong> <span style={{ color: theme.subText }}>{problem.constraints}</span></p>
          <p style={{ fontSize: 17, marginBottom: 6 }}><strong>Test Cases:</strong></p>
          <pre style={{ background: theme.codeBg, padding: "0.7rem", borderRadius: 6, fontSize: 16, color: theme.text, marginBottom: 10 }}>{problem.testCases}</pre>
          <p style={{ fontSize: 17, marginBottom: 0 }}><strong>Category:</strong> <span style={{ color: theme.subText }}>{problem.category}</span></p>
        </div>
        {/* Right: Code Editor and Output */}
        <div style={{
          flex: 1.2,
          minWidth: 340,
          background: theme === 'dark' ? '#232b3a' : '#f7f7f9',
          borderRadius: 14,
          boxShadow: theme === 'dark' ? '0 2px 8px rgba(20,20,30,0.15)' : '0 2px 8px rgba(66,68,90,0.08)',
          padding: '28px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: 18,
        }}>
          <h4 style={{ fontWeight: 700, fontSize: 22, marginBottom: 10, color: theme.text }}>Code Editor</h4>
          <form onSubmit={handleRun} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <label htmlFor="language" style={{ fontWeight: 600, fontSize: 17, color: theme.text }}>Language:</label>
              <select
                id="language"
                value={language}
                onChange={handleLanguageChange}
                style={{ padding: "6px 12px", borderRadius: 6, fontSize: 16, background: theme.cardBg, border: `1px solid ${theme.border}`, color: theme.text }}
              >
                <option value="cpp">C++</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
              </select>
            </div>
            <div>
              <label htmlFor="userInput" style={{ fontWeight: 600, fontSize: 17, color: theme.text }}>Input:</label>
              <textarea
                id="userInput"
                value={userInput}
                onChange={e => setUserInput(e.target.value)}
                rows={3}
                style={{ width: "100%", fontFamily: "Fira Mono, monospace", fontSize: 15, borderRadius: 6, padding: 8, resize: "vertical", marginTop: 4, background: theme.cardBg, border: `1px solid ${theme.border}`, color: theme.text }}
                placeholder="Enter custom input for your code (for Run only)"
              />
            </div>
            <textarea
              value={code}
              onChange={e => setCode(e.target.value)}
              rows={12}
              style={{ width: "100%", fontFamily: "Fira Mono, monospace", fontSize: 16, borderRadius: 8, padding: 10, resize: "vertical", background: theme.cardBg, border: `1px solid ${theme.border}`, color: theme.text }}
            />
            <div style={{ display: 'flex', gap: 16, margin: "1rem 0" }}>
              <button className="btn btn-primary mx-2" type="submit" disabled={loading}
                style={{
                  background: theme.btnBg,
                  color: theme.btnText,
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
              <button type="button" onClick={handleAIReview} disabled={aiLoading || loading}
                style={{
                  background: 'linear-gradient(90deg, #ffe259 0%, #ffa751 100%)',
                  color: darkMode ? '#232526' : '#232526',
                  border: 'none',
                  borderRadius: 8,
                  padding: '10px 28px',
                  fontWeight: 700,
                  fontSize: 18,
                  cursor: aiLoading || loading ? 'not-allowed' : 'pointer',
                  boxShadow: '0 2px 8px rgba(255,226,89,0.13)',
                  transition: 'background 0.2s',
                  outline: 'none',
                }}
              >{aiLoading ? 'Reviewing...' : 'AI Review'}</button>
            </div>
          </form>
          <div style={{ maxHeight: 220, overflowY: "auto", background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: 6, padding: 10, marginTop: 8, color: theme.text }}>
            <strong style={{ color: theme.text, fontSize: 16 }}>Output:</strong>
            <pre style={{ margin: 0, color: theme.text, fontSize: 16 }}>{output}</pre>
          </div>
          {/* AI Review Block */}
          <div style={{ background: theme.aiBg, border: `1px solid ${theme.aiBorder}`, borderRadius: 8, padding: 16, marginTop: 8, minHeight: 60, maxHeight: 200, overflowY: 'auto' }}>
            <strong style={{ color: theme.aiStrong, fontSize: 16 }}>AI Comments:</strong>
            <pre style={{
              margin: 0,
              color: theme.aiText,
              fontSize: 16,
              whiteSpace: 'pre-wrap',
              fontFamily: 'Segoe UI, Arial, sans-serif',
              lineHeight: 1.7,
              letterSpacing: '0.1px',
              background: 'none',
              padding: 0,
              wordBreak: 'break-word',
              overflowX: 'auto',
            }}>{aiReview || 'Click "AI Review" to get feedback and suggestions on your code.'}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProblemDetails;