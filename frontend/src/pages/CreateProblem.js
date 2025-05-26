import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

function CreateProblem() {
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
      const response = await fetch("http://localhost:8080/problems", {
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
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)',
      padding: 0,
      margin: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        maxWidth: 600,
        width: '100%',
        margin: '40px auto',
        background: 'rgba(255,255,255,0.85)',
        borderRadius: 18,
        boxShadow: '0 8px 32px rgba(0,0,0,0.13)',
        padding: 36,
        position: 'relative',
        backdropFilter: 'blur(6px)',
      }}>
        <h2 style={{
          marginBottom: 28,
          color: '#232526',
          fontWeight: 800,
          letterSpacing: 1,
          fontSize: 32,
          textAlign: 'center',
          textShadow: '0 2px 8px #e0e7ef',
        }}>
          Create New Problem
        </h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 18 }}>
            <label style={{ fontWeight: 600, color: '#333', marginBottom: 6, display: 'block' }}>Title</label>
            <input style={inputStyle} name="title" value={problem.title} onChange={handleChange} required />
          </div>
          <div style={{ marginBottom: 18 }}>
            <label style={labelStyle}>Description</label>
            <textarea style={textareaStyle} name="description" value={problem.description} onChange={handleChange} required />
          </div>
          <div style={{ marginBottom: 18 }}>
            <label style={labelStyle}>Input Format</label>
            <textarea style={textareaStyle} name="inputFormat" value={problem.inputFormat} onChange={handleChange} required />
          </div>
          <div style={{ marginBottom: 18 }}>
            <label style={labelStyle}>Output Format</label>
            <textarea style={textareaStyle} name="outputFormat" value={problem.outputFormat} onChange={handleChange} required />
          </div>
          <div style={{ marginBottom: 18 }}>
            <label style={labelStyle}>Constraints</label>
            <textarea style={textareaStyle} name="constraints" value={problem.constraints} onChange={handleChange} required />
          </div>
          <div style={{ marginBottom: 18 }}>
            <label style={labelStyle}>Test Cases <span style={{ color: '#888', fontWeight: 400 }}>(one per line, format: input|expected_output)</span></label>
            <textarea style={textareaStyle} name="testCases" value={problem.testCases} onChange={handleChange} required />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={labelStyle}>Category/Set</label>
            <input style={inputStyle} name="category" value={problem.category} onChange={handleChange} />
          </div>
          <button type="submit" style={buttonStyle}>Create Problem</button>
        </form>
        <button
          onClick={() => navigate('/master-dashboard')}
          style={{
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
          }}
        >
          Back to Dashboard
        </button>
        <ToastContainer />
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '10px 14px',
  borderRadius: 8,
  border: '1px solid #e0e7ef',
  fontSize: 16,
  background: 'rgba(255,255,255,0.95)',
  marginTop: 4,
  marginBottom: 0,
  outline: 'none',
  boxShadow: '0 1px 4px #e0e7ef',
  fontWeight: 500,
};
const textareaStyle = {
  ...inputStyle,
  minHeight: 60,
  resize: 'vertical',
};
const labelStyle = {
  fontWeight: 600,
  color: '#333',
  marginBottom: 6,
  display: 'block',
};
const buttonStyle = {
  width: '100%',
  background: 'linear-gradient(90deg, #5b86e5 0%, #36d1c4 100%)',
  color: '#fff',
  border: 'none',
  borderRadius: 8,
  padding: '12px 0',
  fontWeight: 800,
  fontSize: 18,
  cursor: 'pointer',
  boxShadow: '0 2px 8px rgba(91,134,229,0.13)',
  transition: 'background 0.2s',
  outline: 'none',
  marginTop: 8,
};

export default CreateProblem;