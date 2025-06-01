import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleSuccess, handleError } from "../utils";
import { ToastContainer } from "react-toastify";

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

function Home() {
  const [language, setLanguage] = useState("cpp");
  const [loggedInUser, setLoggedInUser] = useState("");
  const [code, setCode] = useState(defaultCodes["cpp"]);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [problems, setProblems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("firstName"));
    // Fetch all problems
    fetch("http://localhost:8080/problems")
      .then(res => res.json())
      .then(data => setProblems(Array.isArray(data) ? data : []))
      .catch(() => setProblems([]));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    handleSuccess('User logged out!');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setLanguage(lang);
    setCode(defaultCodes[lang]);
    setOutput("");
  };

  const handleRun = async (e) => {
    e.preventDefault();
    setLoading(true);
    setOutput("");
    try {
      const response = await fetch("http://localhost:8080/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language, code }),
      });
      const data = await response.json();
      if (data.success) {
        setOutput(data.output);
        handleSuccess("Code executed successfully!");
      } else {
        setOutput(data.message || "Error running code");
        handleError(data.message || "Error running code");
      }
    } catch (err) {
      setOutput("Network error");
      handleError("Network error");
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #232526 0%, #414345 100%)",
      padding: 0,
      margin: 0,
      fontFamily: "Segoe UI, sans-serif",
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
    }}>
      <div
        style={{
          width: '95vw',
          maxWidth: 1400,
          margin: "40px auto",
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
          padding: 32,
          position: "relative",
          display: 'flex',
          flexDirection: 'row',
          gap: 48,
          minHeight: 600,
        }}
      >
        {/* Left: Code editor and controls */}
        <div style={{ flex: 1.2, minWidth: 320, display: 'flex', flexDirection: 'column' }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
            flexWrap: 'wrap',
            gap: 16,
          }}>
            <h2 style={{ margin: 0, color: "#232526", fontSize: 28 }}>
              👋 Welcome, <span style={{ color: "#007bff" }}>{loggedInUser}</span>
            </h2>
            <button
              onClick={handleLogout}
              style={{
                background: "linear-gradient(90deg, #ff5858 0%, #f09819 100%)",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                padding: "8px 18px",
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(255,88,88,0.1)"
              }}
            >
              Logout
            </button>
          </div>
          <form onSubmit={handleRun} style={{ width: '100%' }}>
            <div style={{ marginBottom: 16 }}>
              <label htmlFor="language" style={{ fontWeight: 600, marginRight: 8 }}>Language:</label>
              <select
                id="language"
                value={language}
                onChange={handleLanguageChange}
                style={{ padding: "6px 12px", borderRadius: 4, fontSize: 16 }}
              >
                <option value="cpp">C++</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
              </select>
            </div>
            <label htmlFor="code" style={{
              display: "block",
              marginBottom: 8,
              fontWeight: 600,
              color: "#333"
            }}>
              {language === "cpp" ? "C++" : language.charAt(0).toUpperCase() + language.slice(1)} Code:
            </label>
            <textarea
              rows={18}
              id="code"
              style={{
                width: "100%",
                fontFamily: "Fira Mono, monospace",
                fontSize: 18,
                borderRadius: 8,
                border: "1px solid #ddd",
                padding: 14,
                background: "#f7f7f9",
                color: "#232526",
                marginBottom: 16,
                resize: "vertical",
                outline: "none",
                transition: "border 0.2s",
                minHeight: 320,
                maxHeight: 600,
                boxSizing: 'border-box',
              }}
              value={code}
              onChange={e => setCode(e.target.value)}
            />
            <button
              type="submit"
              disabled={loading}
              style={{
                background: "linear-gradient(90deg, #36d1c4 0%, #5b86e5 100%)",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                padding: "10px 28px",
                fontWeight: 700,
                fontSize: 18,
                cursor: loading ? "not-allowed" : "pointer",
                boxShadow: "0 2px 8px rgba(91,134,229,0.1)",
                transition: "background 0.2s"
              }}
            >
              {loading ? "Running..." : "Run Code"}
            </button>
          </form>
          <div style={{ marginTop: 40 }}>
            <button
              style={{
                background: "#36d1c4",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                padding: "10px 24px",
                fontWeight: 700,
                fontSize: 18,
                cursor: "pointer",
                marginBottom: 16
              }}
              onClick={() => navigate("/questions")}
            >
              View All Questions
            </button>
          </div>
          <ToastContainer />
        </div>
        {/* Right: Output box */}
        <div style={{ flex: 1, minWidth: 280, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
          <div style={{
            background: "#232526",
            borderRadius: 8,
            padding: 20,
            minHeight: 80,
            color: "#0f0",
            fontFamily: "Fira Mono, monospace",
            fontSize: 18,
            boxShadow: "0 2px 8px rgba(35,37,38,0.08)",
            marginBottom: 24,
            width: '100%',
          }}>
            <h4 style={{ color: "#fff", margin: "0 0 10px 0" }}>Output:</h4>
            <pre style={{
              margin: 0,
              background: "none",
              color: "#0f0",
              fontSize: 18,
              whiteSpace: "pre-wrap"
            }}>
              {output}
            </pre>
          </div>
        </div>
      </div>
      {/* Responsive stacking for small screens */}
      <style>{`
        @media (max-width: 900px) {
          div[style*='max-width: 1400px'] {
            flex-direction: column !important;
            gap: 24px !important;
            padding: 18px !important;
          }
          div[style*='min-width: 320px'] {
            min-width: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}

export default Home;