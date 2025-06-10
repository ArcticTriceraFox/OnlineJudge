import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeContext";

function CreateProblem() {
  const { theme } = useTheme();
  const [problem, setProblem] = useState({
    title: "",
    description: "",
    inputFormat: "",
    outputFormat: "",
    constraints: "",
    testCases: "",
    category: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProblem((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/problems`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`,
        },
        body: JSON.stringify(problem),
      });
      const result = await response.json();
      if (result.success) {
        alert("Problem created successfully!");
        navigate("/master-dashboard");
      } else {
        alert(result.message || "Error creating problem");
      }
    } catch (err) {
      alert("Network error");
    }
  };

  return (
    <div
      className={`create-problem-bg ${theme}-mode`}
      style={{
        minHeight: '100vh',
        background:
          theme === 'dark'
            ? 'linear-gradient(135deg, #232526 0%, #414345 100%)'
            : 'linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)',
        padding: 0,
        margin: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: `'Inter', 'Nunito', 'Segoe UI', Arial, sans-serif`,
        transition: 'background 0.3s',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 1100,
          margin: '48px auto',
          background:
            theme === 'dark'
              ? 'rgba(36, 37, 38, 0.92)'
              : 'rgba(255,255,255,0.85)',
          borderRadius: 24,
          boxShadow:
            '0 8px 32px rgba(91,134,229,0.13), 0 1.5px 8px rgba(54,209,196,0.07)',
          padding: '40px 32px',
          position: 'relative',
          backdropFilter: 'blur(8px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: 40,
          transition: 'background 0.3s',
        }}
      >
        {/* Left column: Main fields */}
        <div>
          <h2
            style={{
              marginBottom: 32,
              color: theme === 'dark' ? '#f8fafc' : '#232526',
              fontWeight: 900,
              letterSpacing: 1,
              fontSize: 36,
              textAlign: 'left',
              textShadow: theme === 'dark' ? '0 2px 8px #232526' : '0 2px 8px #e0e7ef',
              fontFamily: 'inherit',
            }}
          >
            Create New Problem
          </h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 22 }}>
              <label style={labelStyle}>Title</label>
              <input style={inputStyle} name="title" value={problem.title} onChange={handleChange} required />
            </div>
            <div style={{ marginBottom: 22 }}>
              <label style={labelStyle}>Description</label>
              <textarea style={textareaStyle} name="description" value={problem.description} onChange={handleChange} required />
            </div>
            <div style={{ marginBottom: 22 }}>
              <label style={labelStyle}>Input Format</label>
              <textarea style={textareaStyle} name="inputFormat" value={problem.inputFormat} onChange={handleChange} required />
            </div>
            <div style={{ marginBottom: 22 }}>
              <label style={labelStyle}>Output Format</label>
              <textarea style={textareaStyle} name="outputFormat" value={problem.outputFormat} onChange={handleChange} required />
            </div>
          </form>
        </div>
        {/* Right column: Constraints, Test Cases, Category, Actions */}
        <div>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 22 }}>
              <label style={labelStyle}>Constraints</label>
              <textarea style={textareaStyle} name="constraints" value={problem.constraints} onChange={handleChange} required />
            </div>
            <div style={{ marginBottom: 22 }}>
              <label style={labelStyle}>
                Test Cases{' '}
                <span style={{ color: '#888', fontWeight: 400, fontSize: 14 }}>
                  (one per line, format: input|expected_output)
                </span>
              </label>
              <textarea style={textareaStyle} name="testCases" value={problem.testCases} onChange={handleChange} required />
            </div>
            <div style={{ marginBottom: 28 }}>
              <label style={labelStyle}>Category/Set</label>
              <input style={inputStyle} name="category" value={problem.category} onChange={handleChange} />
            </div>
            <button type="submit" style={buttonStyle}>
              <span style={{ verticalAlign: 'middle', marginRight: 8, fontSize: 20 }}>➕</span> Create Problem
            </button>
            <button
              type="button"
              onClick={() => navigate('/master-dashboard')}
              style={backBtnStyle}
            >
              ← Back to Dashboard
            </button>
            <ToastContainer />
          </form>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '12px 16px',
  borderRadius: 10,
  border: '1.5px solid #e0e7ef',
  fontSize: 17,
  background: 'rgba(255,255,255,0.97)',
  marginTop: 4,
  marginBottom: 0,
  outline: 'none',
  boxShadow: '0 1.5px 6px #e0e7ef',
  fontWeight: 500,
  transition: 'box-shadow 0.2s, border 0.2s',
};
const textareaStyle = {
  ...inputStyle,
  minHeight: 70,
  resize: 'vertical',
};
const labelStyle = {
  fontWeight: 700,
  color: '#232526',
  marginBottom: 8,
  display: 'block',
  fontSize: 16,
  letterSpacing: 0.2,
};
const buttonStyle = {
  width: '100%',
  background: 'linear-gradient(90deg, #5b86e5 0%, #36d1c4 100%)',
  color: '#fff',
  border: 'none',
  borderRadius: 10,
  padding: '14px 0',
  fontWeight: 900,
  fontSize: 19,
  cursor: 'pointer',
  boxShadow: '0 2px 12px rgba(91,134,229,0.13)',
  transition: 'background 0.2s, box-shadow 0.2s',
  outline: 'none',
  marginTop: 10,
  marginBottom: 0,
  letterSpacing: 0.5,
};
const backBtnStyle = {
  marginTop: 18,
  background: 'none',
  color: '#36d1c4',
  border: 'none',
  fontWeight: 700,
  fontSize: 16,
  cursor: 'pointer',
  textDecoration: 'underline',
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
};

export default CreateProblem;